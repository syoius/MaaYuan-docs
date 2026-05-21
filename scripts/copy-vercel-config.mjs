import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("vercel.json");
const destination = resolve(".vitepress/dist/vercel.json");
const sourceConfig = JSON.parse(await readFile(source, "utf8"));
const distConfig = {
  redirects: sourceConfig.redirects,
  headers: sourceConfig.headers,
};

await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(distConfig, null, 2)}\n`);
