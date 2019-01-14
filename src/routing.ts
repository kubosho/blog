import { Router } from 'express';

import { entryRouteHander } from './Entry/EntryRouteHandler';
import { privacyRouteHander } from './Privacy/PrivacyRouteHandler';
import { topRouteHander } from './Top/TopRouteHandler';
import { EntryValue } from './entryValue';

export function route(entries: EntryValue[]): Router {
  const router = Router();

  topRouteHander(router, entries);
  entryRouteHander(router, entries);
  privacyRouteHander(router);

  return router;
}
