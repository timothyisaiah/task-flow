import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const isStaticBuild = process.env.BUILD_STATIC === "true";

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyFileWithDirs(source, target) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function runNextBuild(cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "build"], {
      cwd,
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`next build exited with signal ${signal}`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

async function stageStaticProject(tempDir) {
  await fs.rm(tempDir, { recursive: true, force: true });
  await fs.mkdir(tempDir, { recursive: true });

  const projectFiles = [
    "package.json",
    "next.config.ts",
    "tsconfig.json",
    "next-env.d.ts",
    "postcss.config.mjs",
    "tailwind.config.js",
  ];

  for (const relativePath of projectFiles) {
    const source = path.join(rootDir, relativePath);
    if (await exists(source)) {
      await copyFileWithDirs(source, path.join(tempDir, relativePath));
    }
  }

  const publicDir = path.join(rootDir, "public");
  if (await exists(publicDir)) {
    await fs.cp(publicDir, path.join(tempDir, "public"), { recursive: true });
  }

  const tempAppDir = path.join(tempDir, "app");
  await fs.mkdir(tempAppDir, { recursive: true });
  await copyFileWithDirs(
    path.join(rootDir, "app", "globals.css"),
    path.join(tempAppDir, "globals.css"),
  );

  const optionalAssets = ["favicon.ico"];
  for (const asset of optionalAssets) {
    const source = path.join(rootDir, "app", asset);
    if (await exists(source)) {
      await copyFileWithDirs(source, path.join(tempAppDir, asset));
    }
  }

  const staticUiFiles = [
    ["ui/static-preview-page.tsx", "ui/static-preview-page.tsx"],
    ["ui/toggletheme.tsx", "ui/toggletheme.tsx"],
  ];

  for (const [sourceRelative, targetRelative] of staticUiFiles) {
    await copyFileWithDirs(
      path.join(rootDir, "app", sourceRelative),
      path.join(tempAppDir, targetRelative),
    );
  }

  const staticFiles = [
    ["layout.static.tsx", "layout.tsx"],
    ["page.static.tsx", "page.tsx"],
    ["dashboard/page.static.tsx", "dashboard/page.tsx"],
    ["login/page.static.tsx", "login/page.tsx"],
    ["whiteboard/page.static.tsx", "whiteboard/page.tsx"],
  ];

  for (const [sourceRelative, targetRelative] of staticFiles) {
    await copyFileWithDirs(
      path.join(rootDir, "app", sourceRelative),
      path.join(tempAppDir, targetRelative),
    );
  }
}

async function main() {
  let exitCode = 1;
  const tempDir = path.join(rootDir, ".static-build-temp");

  try {
    if (isStaticBuild) {
      await stageStaticProject(tempDir);
      await fs.rm(path.join(rootDir, ".next"), { recursive: true, force: true });
      await fs.rm(path.join(rootDir, "out"), { recursive: true, force: true });
      exitCode = await runNextBuild(tempDir);

      if (exitCode === 0) {
        const tempOutDir = path.join(tempDir, "out");
        if (await exists(tempOutDir)) {
          await fs.cp(tempOutDir, path.join(rootDir, "out"), {
            recursive: true,
          });
        }
      }
    } else {
      exitCode = await runNextBuild(rootDir);
    }
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }

  process.exit(exitCode);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
