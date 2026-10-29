#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const packageFile = path.join(root, "package.json");

try {
  await access(packageFile, constants.R_OK);
} catch {
  console.error("Run ui-preview-init from the root of a Next.js project.");
  process.exit(1);
}

const packageJson = JSON.parse(await readFile(packageFile, "utf8"));
if (
  !packageJson.dependencies?.["@zakaihamilton/ui-preview-kit"] &&
  !packageJson.devDependencies?.["@zakaihamilton/ui-preview-kit"]
) {
  console.error("Install @zakaihamilton/ui-preview-kit first.");
  process.exit(1);
}

let appRoot;
for (const candidate of ["src/app", "app"]) {
  try {
    await access(path.join(root, candidate), constants.R_OK);
    appRoot = path.join(root, candidate);
    break;
  } catch {}
}

if (!appRoot) {
  console.error("No App Router folder found. Supported locations are src/app and app.");
  process.exit(1);
}

const routeDir = path.join(appRoot, "ui-preview");
const pageFile = path.join(routeDir, "page.tsx");
try {
  await access(pageFile, constants.F_OK);
  console.error("A /ui-preview route already exists; no files were changed.");
  process.exit(1);
} catch {}

await mkdir(routeDir, { recursive: true });
const nl = String.fromCharCode(10);
const page = [
  'import { notFound } from "next/navigation";',
  'import PreviewClient from "./preview-client";', "",
  "export default function UiPreviewPage() {",
  '  if (process.env.NODE_ENV !== "development") notFound();',
  "  return <PreviewClient />;",
  "}",
  ""
].join(nl);
const client = [
  '"use client";', "",
  'import { useState } from "react";',
  'import { PreviewDropdown, PreviewToolbar } from "@zakaihamilton/ui-preview-kit";',
  'import styles from "./page.module.css";', "",
  'const screens = [{ value: "overview", label: "Overview" }, { value: "settings", label: "Settings" }];',
  'const scenarios = [{ value: "populated", label: "Populated" }, { value: "empty", label: "Empty" }];', "",
  "export default function PreviewClient() {",
  '  const [screen, setScreen] = useState("overview");',
  '  const [scenario, setScenario] = useState("populated");',
  "  return (",
  '    <main className={styles.page}>',
  '      <PreviewToolbar subtitle="Synthetic data · local preview" note="Replace this starter content with safe, synthetic examples from your application.">',
  '        <PreviewDropdown label="Screen" value={screen} options={screens} onSelect={setScreen} />',
  '        <PreviewDropdown label="Scenario" value={scenario} options={scenarios} onSelect={setScenario} />',
  "      </PreviewToolbar>",
  '      <section className={styles.content} aria-label="Preview screen">',
  '        <p>Selected screen: <strong>{screens.find((item) => item.value === screen)?.label}</strong></p>',
  '        <p>Scenario: <strong>{scenarios.find((item) => item.value === scenario)?.label}</strong></p>',
  "      </section>",
  "    </main>",
  "  );",
  "}",
  ""
].join(nl);
const css = [
  ".page { min-height: 100vh; padding: 24px; background: #f5f7fb; }",
  ".content { margin-top: 20px; padding: 24px; color: #27354a; background: #fff; border: 1px solid #e1e7ef; border-radius: 14px; }",
  ".content p { margin: 0; }",
  ".content p + p { margin-top: 8px; }",
  "@media (max-width: 560px) { .page { padding: 12px; } .content { margin-top: 12px; padding: 16px; } }",
  ""
].join(nl);
await writeFile(pageFile, page, "utf8");
await writeFile(path.join(routeDir, "preview-client.tsx"), client, "utf8");
await writeFile(path.join(routeDir, "page.module.css"), css, "utf8");
console.log("Created " + path.relative(root, pageFile) + ", preview-client.tsx, and page.module.css.");
