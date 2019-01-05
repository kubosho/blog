import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';
import { createContentfulClient } from './entriesGateway';
import { route } from './routing';

const PORT = process.env.PORT || 8080;

function main() {
  dotenvConfig();

  const app = express();
  const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);

  route(app, client);
  app.listen(PORT);

  // tslint:disable-next-line no-console
  console.log(`The server is running at port:${PORT}`);
}

main();
