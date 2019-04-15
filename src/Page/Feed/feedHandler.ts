import { readFile as legacyReadFile } from 'fs';
import { promisify } from 'util';

const CWD = process.cwd();
const DIST_DIR = 'dist';
const OUTPUT_FILE = 'feed.xml';
const DESTINATION_FILE = `${CWD}/${DIST_DIR}/${OUTPUT_FILE}`;

const readFile = promisify(legacyReadFile);

export const feedHandler = async () => {
  const rss = await readFile(DESTINATION_FILE, 'utf-8');
  return rss;
};
