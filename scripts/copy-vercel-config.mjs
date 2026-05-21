import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("vercel.json");
const destination = resolve(".vitepress/dist/vercel.json");

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);
