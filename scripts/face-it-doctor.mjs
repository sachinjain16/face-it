#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));

if (!args.target || args.help) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const outDir = resolve(args.out || "face-it-output");
mkdirSync(outDir, { recursive: true });

const target = args.target;
const surface = slug(args.surface || basename(target, extname(target)) || "surface");
const result = {
  target,
  surface,
  checks: [],
  screenshots: [],
  consoleErrors: [],
  scorecard: {
    hierarchy: null,
    spacingDensity: null,
    responsiveness: null,
    themeContrast: null,
    readiness: null,
    fit: null,
    accessibility: null,
  },
};

let server;
let url = target;
try {
  if (isLikelyFile(target)) {
    const filePath = resolve(target);
    const html = await readFile(filePath, "utf8");
    result.checks.push(...scanHtml(html));
    server = await serveDirectory(dirname(filePath));
    url = `http://127.0.0.1:${server.port}/${encodeURIComponent(basename(filePath))}`;
  }

  await captureIfPossible(url, outDir, surface, result);
} finally {
  if (server) await server.close();
}

result.checks.push({
  name: "scorecard",
  status: "manual",
  detail: "Assign 1-5 scores after visual inspection: hierarchy, spacing/density, responsiveness, theme/contrast, readiness.",
});

const report = formatReport(result);
console.log(report);

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (item === "--help" || item === "-h") parsed.help = true;
    else if (item === "--out") parsed.out = argv[++i];
    else if (item === "--surface") parsed.surface = argv[++i];
    else if (!parsed.target) parsed.target = item;
  }
  return parsed;
}

function printHelp() {
  console.log(`Face-It Doctor

Usage:
  node scripts/face-it-doctor.mjs <html-file-or-url> [--surface name] [--out folder]

Examples:
  node scripts/face-it-doctor.mjs .\\artifact.html --surface dashboard
  node scripts/face-it-doctor.mjs http://127.0.0.1:3000 --surface app-home
`);
}

function isLikelyFile(value) {
  return !/^https?:\/\//i.test(value) && existsSync(resolve(value));
}

function scanHtml(html) {
  const checks = [];
  checks.push(check("theme detection", /clawpilotTheme/.test(html), "Expected Clawpilot theme detection script."));
  checks.push(check("theme variables", /--cp-bg/.test(html) && /--cp-text/.test(html), "Expected Clawpilot --cp-* variables."));
  checks.push(check("font", /Segoe UI/.test(html) && /Aptos/.test(html), "Expected Segoe UI/Aptos typography."));

  const hardcodedColors = [...html.matchAll(/#[0-9a-fA-F]{3,8}|rgb\(|hsl\(/g)]
    .map((match) => match[0])
    .filter((value) => !allowedThemeColor(value));
  checks.push({
    name: "hardcoded colors",
    status: hardcodedColors.length ? "warn" : "pass",
    detail: hardcodedColors.length
      ? `Found non-theme color tokens: ${[...new Set(hardcodedColors)].slice(0, 12).join(", ")}`
      : "No non-theme color tokens found.",
  });

  checks.push(check("dark mode", /html\[data-theme=["']dark["']\]/.test(html), "Expected dark theme selector."));
  return checks;
}

function allowedThemeColor(value) {
  const allowed = new Set([
    "#f7f4ef", "#fcfbf8", "#ffffff", "#f5f5f5", "#dedede", "#919191", "#242424",
    "#5c5c5c", "#6f6f6f", "#b11f4b", "#9a1a41", "#16a34a", "#dc2626", "#f59e0b",
    "#0078d4", "#3d3b3a", "#343231", "#292929", "#2e2e2e", "#474747", "#5f5f5f",
    "#b0b0b0", "#fd8ea1", "#fb7b91", "#1a1a1a", "#4ade80", "#f87171", "#fbbf24",
    "#4da6ff",
  ]);
  return allowed.has(value.toLowerCase());
}

function check(name, passed, detail) {
  return { name, status: passed ? "pass" : "warn", detail };
}

function serveDirectory(rootDir) {
  return new Promise((resolveServer, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const requested = decodeURIComponent(new URL(req.url || "/", "http://127.0.0.1").pathname.slice(1));
        const filePath = join(rootDir, requested || "index.html");
        const body = await readFile(filePath);
        res.setHeader("content-type", filePath.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream");
        res.end(body);
      } catch {
        res.statusCode = 404;
        res.end("Not found");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolveServer({
        port: address.port,
        close: () => new Promise((resolveClose) => server.close(resolveClose)),
      });
    });
    server.on("error", reject);
  });
}

async function captureIfPossible(url, outDir, surface, result) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    result.checks.push({
      name: "screenshots",
      status: "manual",
      detail: "Playwright is not installed. Run `npm install -D playwright` in this repo or use Clawpilot browser tools.",
    });
    return;
  }

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    page.on("console", (message) => {
      if (message.type() === "error") result.consoleErrors.push(message.text());
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(url);
    await page.waitForLoadState("networkidle").catch(() => undefined);
    const desktopPath = join(outDir, `face-it-${surface}-before.png`);
    await page.screenshot({ path: desktopPath, fullPage: true });
    result.screenshots.push(desktopPath);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await page.waitForLoadState("networkidle").catch(() => undefined);
    const narrowPath = join(outDir, `face-it-${surface}-narrow.png`);
    await page.screenshot({ path: narrowPath, fullPage: true });
    result.screenshots.push(narrowPath);

    result.checks.push({
      name: "screenshots",
      status: "pass",
      detail: `Captured ${result.screenshots.length} screenshot(s).`,
    });
    result.checks.push({
      name: "console errors",
      status: result.consoleErrors.length ? "warn" : "pass",
      detail: result.consoleErrors.length ? result.consoleErrors.slice(0, 5).join(" | ") : "No console errors captured.",
    });
  } finally {
    await browser.close();
  }
}

function formatReport(result) {
  const lines = [
    "# Face-It Doctor Report",
    "",
    `Target: ${result.target}`,
    `Surface: ${result.surface}`,
    "",
    "## Checks",
    ...result.checks.map((item) => `- ${icon(item.status)} ${item.name}: ${item.detail}`),
    "",
    "## Screenshots",
    ...(result.screenshots.length ? result.screenshots.map((item) => `- ${item}`) : ["- None captured."]),
    "",
    "## Scorecard stub",
    "- hierarchy: _/5",
    "- spacing/density: _/5",
    "- responsiveness: _/5",
    "- theme/contrast: _/5",
    "- readiness: _/5",
    "",
    "## Next",
    "- Inspect screenshots visually.",
    "- Fix any warn/fail items.",
    "- Recapture as face-it-<surface>-after.png after fixes.",
  ];
  return lines.join("\n");
}

function icon(status) {
  if (status === "pass") return "PASS";
  if (status === "manual") return "MANUAL";
  return "WARN";
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "surface";
}
