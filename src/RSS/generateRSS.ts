import { writeFile as legacyWriteFile } from 'fs';
import { promisify } from 'util';
import { Nullable } from 'option-t/lib/Nullable/Nullable';

import { EntryValue } from '../Entry/entryValue';
import { entryGateway } from '../Entry/entryContext';
import { createRSSObject } from './rssObjectFactory';
import { toXMLString } from './rssObjectConverter';

const writeFile = promisify(legacyWriteFile);

const CWD = process.cwd();
const DIST_DIR = 'dist';
const OUTPUT_FILE = 'feed.xml';
const DESTINATION_FILE = `${CWD}/${DIST_DIR}/${OUTPUT_FILE}`;

export async function generateRSS() {
  let entries: Nullable<ReadonlyArray<EntryValue>> = null;

  try {
    entries = await entryGateway.fetchAllEntries();
  } catch (err) {
    throw new Error(err);
  }

  const o = createRSSObject(entries);
  const xmlString = toXMLString(o);
  await writeFile(DESTINATION_FILE, xmlString);
}
