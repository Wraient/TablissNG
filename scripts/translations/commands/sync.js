const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const {
  localesDir,
  extractedMessagesPath,
  readJson,
  normalizeExtractedMessages,
  listLanguageFiles,
  getWhitelistedIds,
  formatSummaryLine,
  logInfo,
  validateMessageObject,
  sortKeys,
  writeJsonIfChanged,
} = require("../shared");

const rootDir = path.resolve(__dirname, "..", "..", "..");

function extractMessages() {
  const formatjsBin = path.join(rootDir, "node_modules", ".bin", "formatjs");
  if (!fs.existsSync(formatjsBin)) {
    console.error("\n✗ Missing FormatJS CLI binary: node_modules/.bin/formatjs");
    console.error("  Run `npm install` from the repository root, then try again.");
    process.exit(1);
  }

  const args = [
    "extract",
    "src/**/*.{ts,tsx}",
    "--ignore",
    "**/*.d.ts",
    "--out-file",
    "src/locales/extractedMessages/messages.json",
  ];

  try {
    execFileSync(formatjsBin, args, {
      cwd: rootDir,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  } catch (err) {
    console.error(`\n✗ Failed to extract messages: ${err.message}`);
    process.exit(1);
  }
}

function formatChangeLine(label, count, ids) {
  if (count === 0) return "";
  const preview = ids.slice(0, 10);
  const suffix = ids.length > preview.length ? `, ... (+${ids.length - preview.length} more)` : "";
  return `    ${label} ${count} ${count === 1 ? "key" : "keys"}: ${preview.join(", ")}${suffix}`;
}

function mergeLanguage(defaultMessages, existingMessages, whitelistedIds) {
  const merged = {};
  const changes = { added: [], updated: [], removed: [] };

  for (const id of Object.keys(defaultMessages).sort()) {
    const defaultMessage = defaultMessages[id];

    if (whitelistedIds.has(id)) {
      merged[id] = defaultMessage;
      if (!(id in existingMessages)) {
        changes.added.push(id);
      } else if (existingMessages[id] !== defaultMessage) {
        changes.updated.push(id);
      }
      continue;
    }

    const existingMessage = existingMessages[id];
    if (typeof existingMessage === "string" && existingMessage.length > 0) {
      merged[id] = existingMessage;
    } else {
      merged[id] = defaultMessage;
      if (!(id in existingMessages)) {
        changes.added.push(id);
      }
    }
  }

  for (const id of Object.keys(existingMessages)) {
    if (!(id in defaultMessages)) {
      // Keep unknown keys. They may be dynamic IDs that extraction can't statically detect.
      merged[id] = existingMessages[id];
      continue;
    }

    if (!(id in merged)) {
      changes.removed.push(id);
    }
  }

  return { merged: sortKeys(merged), changes };
}

function runSync(context) {
  logInfo(context, "⟳ Extracting messages from source...\n");
  extractMessages();

  const extractedRaw = readJson(extractedMessagesPath, {});
  if (!extractedRaw || typeof extractedRaw !== "object" || Array.isArray(extractedRaw)) {
    console.error("✗ Extracted messages file is not a valid JSON object.");
    process.exit(1);
  }
  const defaultMessages = normalizeExtractedMessages(extractedRaw);
  const extractedCount = Object.keys(defaultMessages).length;
  logInfo(context, `  Found ${extractedCount} message(s) in source.\n`);

  const languageFiles = listLanguageFiles();
  logInfo(context, `⟳ Syncing ${languageFiles.length} language file(s)...\n`);

  let totalAdded = 0;
  let totalUpdated = 0;
  let totalRemoved = 0;

  for (const languageFile of languageFiles) {
    const languagePath = path.join(localesDir, languageFile);
    const existingMessages = readJson(languagePath, {});

    if (!validateMessageObject(existingMessages, languageFile)) {
      continue;
    }

    const whitelistedIds = getWhitelistedIds(languageFile);
    const { merged, changes } = mergeLanguage(
      defaultMessages,
      existingMessages,
      whitelistedIds,
    );

    const hasChanges =
      changes.added.length > 0 ||
      changes.updated.length > 0 ||
      changes.removed.length > 0;

    if (hasChanges) {
      writeJsonIfChanged(languagePath, merged, context);
      logInfo(context, `  ${languageFile}:`);
      if (changes.added.length > 0) {
        logInfo(context, formatChangeLine("+", changes.added.length, changes.added));
        totalAdded += changes.added.length;
      }
      if (changes.updated.length > 0) {
        logInfo(context, formatChangeLine("~", changes.updated.length, changes.updated));
        totalUpdated += changes.updated.length;
      }
      if (changes.removed.length > 0) {
        logInfo(context, formatChangeLine("-", changes.removed.length, changes.removed));
        totalRemoved += changes.removed.length;
      }
    }
  }

  console.log(
    formatSummaryLine(
      `Done. ${totalAdded} added, ${totalUpdated} updated, ${totalRemoved} removed across all languages.`,
      context,
    ),
  );
}

module.exports = { runSync };
