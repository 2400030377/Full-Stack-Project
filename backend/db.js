import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
export const USERS_FILE = path.join(DATA_DIR, 'users.json');
export const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
export const LEADERS_FILE = path.join(DATA_DIR, 'leaders.json');
export const LOGS_FILE = path.join(DATA_DIR, 'logs.json');

async function ensureDirectory() {
  try {
    await access(DATA_DIR);
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function ensureFile(filePath, defaultValue) {
  try {
    await access(filePath);
  } catch {
    await writeFile(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
  }
}

export async function readJson(filePath, defaultValue = []) {
  await ensureDirectory();
  await ensureFile(filePath, defaultValue);
  const contents = await readFile(filePath, 'utf8');
  return JSON.parse(contents || JSON.stringify(defaultValue));
}

export async function writeJson(filePath, data) {
  await ensureDirectory();
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}
