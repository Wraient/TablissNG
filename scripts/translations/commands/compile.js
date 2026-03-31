const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const {
  localesDir,
  normalizeExtractedMessages,
  readJson,
  listLanguageFiles,
  getWhitelistedIds,
  sortKeys,
} = require("../shared");

const rootDir = path.resolve(__dirname, "..", "..", "..");
const compiledLocalesDir = path.join(
  rootDir,
  "src",
  "locales",
  "lang.compiled",
);
const extractedMessagesPath = path.join(
  rootDir,
  "src",
  "locales",
  "extractedMessages",
  "messages.json",
);

function extractMessages() {
  const formatjsBin = path.join(rootDir, "node_modules", ".bin", "formatjs");
  if (!fs.existsSync(formatjsBin)) {
    console.error(
      "\n✗ Missing FormatJS CLI binary: node_modules/.bin/formatjs",
    );
    console.error(
      "  Run `npm install` from the repository root, then try again.",
    );
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

function ensureCleanCompiledDirectory() {
  fs.rmSync(compiledLocalesDir, { recursive: true, force: true });
  fs.mkdirSync(compiledLocalesDir, { recursive: true });
}

function toMinifiedJson(value) {
  return `${JSON.stringify(value)}\n`;
}

function writeMinifiedJson(filePath, value, context) {
  const content = toMinifiedJson(value);
  if (context.dryRun) return;
  fs.writeFileSync(filePath, content);
}

function compileLanguage(defaultMessages, existingMessages, whitelistedIds) {
  const compiled = {};

  for (const id of Object.keys(defaultMessages).sort()) {
    const defaultMessage = defaultMessages[id];
    const existingMessage = existingMessages[id];

    if (whitelistedIds.has(id)) {
      compiled[id] = defaultMessage;
      continue;
    }

    if (
      typeof existingMessage === "string" &&
      existingMessage.length > 0 &&
      existingMessage !== defaultMessage
    ) {
      compiled[id] = existingMessage;
    }
  }

  // Preserve unknown/dynamic keys that are not extractable from source.
  for (const [id, value] of Object.entries(existingMessages)) {
    if (!Object.hasOwn(defaultMessages, id) && typeof value === "string") {
      compiled[id] = value;
    }
  }

  return sortKeys(compiled);
}

function runCompile(context) {
  if (!context.quiet) {
    console.log("⟳ Extracting messages from source...\n");
  }
  extractMessages();

  const defaultMessages = normalizeExtractedMessages(
    readJson(extractedMessagesPath, {}),
  );
  const languageFiles = listLanguageFiles();

  if (!context.quiet) {
    console.log(
      `⟳ Compiling ${languageFiles.length} locale file(s) for production...\n`,
    );
  }

  ensureCleanCompiledDirectory();

  let totalKeys = 0;

  for (const languageFile of languageFiles) {
    const sourcePath = path.join(localesDir, languageFile);
    const targetPath = path.join(compiledLocalesDir, languageFile);
    const existingMessages = readJson(sourcePath, {});
    const whitelistedIds = getWhitelistedIds(languageFile);
    const compiled = compileLanguage(
      defaultMessages,
      existingMessages,
      whitelistedIds,
    );
    totalKeys += Object.keys(compiled).length;
    writeMinifiedJson(targetPath, compiled, context);
  }

  if (context.dryRun) {
    console.log(
      `\n⊘ DRY RUN: would compile ${languageFiles.length} locale files (${totalKeys} keys total) to src/locales/lang.compiled`,
    );
    return;
  }

  console.log(
    `\n✓ Compiled ${languageFiles.length} locale files (${totalKeys} keys total) to src/locales/lang.compiled`,
  );
}

module.exports = { runCompile };
