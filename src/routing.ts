import { Router } from 'express';

import { ENTRY_PATH, TOP_PATH, PRIVACY_PATH } from './Application/paths';
import { TopHandler } from './Top/TopHandler';
import { EntryHandler } from './Entry/EntryHandler';
import { PrivacyHandler } from './Privacy/PrivacyHandler';

export function route(): Router {
  const router = Router();

  router.get(TOP_PATH, TopHandler);
  router.get(ENTRY_PATH, EntryHandler);
  router.get(PRIVACY_PATH, PrivacyHandler);

  return router;
}
