import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';
import { createContentfulClient } from './entriesGateway';
import { route } from './routing';

function main() {
  dotenvConfig();

  const app = express();
  const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);

  route(app, client);
  app.listen(8080);
}

main();
