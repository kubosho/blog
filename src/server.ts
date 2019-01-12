import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';

import { ASSETS_PATH } from './Application/paths';
import { EntriesGateway } from './entriesGateway';
import { EntryValue } from './entryValue';
import { createContentfulClient } from './contentfulClient';
import { route } from './routing';

const PORT = process.env.PORT || 8080;

async function fetchEntries(): Promise<EntryValue[]> {
  const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);
  const gateway = new EntriesGateway(client);

  let entries = null;

  try {
    entries = await gateway.fetch();
  } catch (err) {
    throw new Error(err);
  }

  return entries;
}

async function main() {
  dotenvConfig();

  const app = express();
  const entries = await fetchEntries();

  app.use(route(entries));
  app.use(ASSETS_PATH, express.static(`${__dirname}${ASSETS_PATH}`));

  app.listen(PORT);
  // tslint:disable-next-line no-console
  console.log(`The server is running at port:${PORT}`);
}

main();
