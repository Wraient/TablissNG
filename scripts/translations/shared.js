const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const localesDir = path.join(rootDir, "src", "locales", "lang");
const extractedMessagesPath = path.join(
  rootDir,
  "src",
  "locales",
  "extractedMessages",
  "messages.json",
);

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(
      `  ✗ Failed to parse ${path.basename(filePath)}: ${err.message}`,
    );
    return fallback;
  }
}

function toJsonContent(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function writeJson(filePath, value, context) {
  const content = toJsonContent(value);
  if (context.dryRun) {
    return;
  }
  fs.writeFileSync(filePath, content);
}

function writeJsonIfChanged(filePath, value, context) {
  const content = toJsonContent(value);
  const existing = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : null;
  if (existing === content) {
    return false;
  }

  if (context.dryRun) {
    return true;
  }

  fs.writeFileSync(filePath, content);
  return true;
}

function sortKeys(obj) {
  return Object.fromEntries(
    Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)),
  );
}

function normalizeExtractedMessages(extracted) {
  if (Array.isArray(extracted)) {
    return Object.fromEntries(
      extracted.flatMap((message) => {
        const id = message?.id;
        if (!id) return [];
        return [
          [
            id,
            typeof message.defaultMessage === "string"
              ? message.defaultMessage
              : "",
          ],
        ];
      }),
    );
  }

  if (!extracted || typeof extracted !== "object") {
    return {};
  }

  const normalized = {};

  for (const [id, value] of Object.entries(extracted)) {
    normalized[id] =
      typeof value === "string"
        ? value
        : typeof value?.defaultMessage === "string"
          ? value.defaultMessage
          : "";
  }

  return normalized;
}

function listLanguageFiles() {
  return fs
    .readdirSync(localesDir)
    .filter((file) => file.endsWith(".json") && !file.startsWith("whitelist_"))
    .sort();
}

function getWhitelistedIds(languageFile) {
  const language = languageFile.replace(/\.json$/, "");
  const whitelistPath = path.join(localesDir, `whitelist_${language}.json`);
  const whitelist = readJson(whitelistPath, []);
  return new Set(Array.isArray(whitelist) ? whitelist : []);
}

function formatSummaryLine(message, context) {
  if (context.dryRun) {
    return `\n⊘ DRY RUN: ${message}`;
  }
  return `\n✓ ${message}`;
}

function logInfo(context, message) {
  if (!context.quiet) {
    console.log(message);
  }
}

function validateMessageObject(obj, filename) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    console.error(`  ✗ ${filename}: invalid JSON, skipping.`);
    return false;
  }
  return true;
}

module.exports = {
  localesDir,
  extractedMessagesPath,
  readJson,
  writeJson,
  writeJsonIfChanged,
  normalizeExtractedMessages,
  listLanguageFiles,
  getWhitelistedIds,
  formatSummaryLine,
  logInfo,
  validateMessageObject,
  sortKeys,
};
