import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

// These files are retained locally as an unused upstream-template archive.
// They are not referenced by the public routes, so do not publish them or
// spend static-hosting bandwidth on them.
const exportRoot = join(process.cwd(), "out");
const unusedTemplateAssets = [
  "blogs",
  "experience",
  "projects",
  "logo.png",
  "next.svg",
  "profile-img.jpg",
  "vercel.svg",
];

for (const assetPath of unusedTemplateAssets) {
  const target = join(exportRoot, assetPath);
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }
}
