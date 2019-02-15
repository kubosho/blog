import { config as dotenvConfig } from 'dotenv';
import * as express from 'express';

import { ASSETS_PATH } from './Application/paths';
import { route } from './Application/routing';

const PORT = process.env.PORT || 8080;

function main() {
  dotenvConfig();

  const app = express();

  app.use(route());
  app.use(ASSETS_PATH, express.static(`${__dirname}${ASSETS_PATH}`));

  if (process.env.RELEASE_CHANNEL === 'local') {
    app.listen(PORT);
    // tslint:disable-next-line no-console
    console.log(`The server is running at port:${PORT}`);
  }

  return app;
}

main();
