import * as express from 'express';

import { ASSETS_PATH } from './Application/paths';
import { entryRouteHander } from './Entry/EntryRouteHandler';
import { topRouteHander } from './Top/TopRouteHandler';
import { EntryValue } from './entryValue';

export async function route(app: express.Express, entries: EntryValue[]) {
  app.use(ASSETS_PATH, express.static(`${__dirname}${ASSETS_PATH}`));

  topRouteHander(app, entries);
  entryRouteHander(app, entries);
}
