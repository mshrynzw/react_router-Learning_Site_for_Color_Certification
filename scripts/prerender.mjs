import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const ssrBundle = join(root, "dist-ssr", "prerender.js");

const mod = await import(pathToFileURL(ssrBundle).href);
const { renderRoute, prerenderPaths } = mod;

const templatePath = join(distDir, "index.html");
const template = readFileSync(templatePath, "utf-8");
const marker = '<div id="root"></div>';

const origConsoleError = console.error;
console.error = (...args) => {
  const msg = args[0];
  if (
    typeof msg === "string" &&
    msg.includes("useLayoutEffect does nothing on the server")
  ) {
    return;
  }
  origConsoleError.apply(console, args);
};

for (const path of prerenderPaths) {
  const appHtml = renderRoute(path);
  const html = template.replace(marker, `<div id="root">${appHtml}</div>`);
  const relative =
    path === "/" ? "index.html" : join(...path.replace(/^\//, "").split("/"), "index.html");
  const outPath = join(distDir, relative);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

console.error = origConsoleError;
