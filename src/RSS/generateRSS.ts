import { writeFile as legacyWriteFile } from 'fs';
import { promisify } from 'util';
import { createRSSObject } from './rssObjectFactory';
import { toXMLString } from './rssObjectConverter';

const writeFile = promisify(legacyWriteFile);

const CWD = process.cwd();
const DIST_DIR = 'dist';
const OUTPUT_FILE = 'feed.xml';
const DESTINATION_FILE = `${CWD}/${DIST_DIR}/${OUTPUT_FILE}`;

export async function generateRSS() {
  const o = await createRSSObject();
  const xmlString = toXMLString(o);
  await writeFile(DESTINATION_FILE, xmlString);
}
