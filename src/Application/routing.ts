import { Router } from 'express';

import { TopHandler } from '../Page/Top/TopHandler';
import { EntryHandler } from '../Page/Entry/EntryHandler';
import { PrivacyHandler } from '../Page/Privacy/PrivacyHandler';
import { ENTRY_PATH, TOP_PATH, PRIVACY_PATH } from './paths';

export function route(): Router {
  const router = Router();

  router.get(TOP_PATH, TopHandler);
  router.get(ENTRY_PATH, EntryHandler);
  router.get(PRIVACY_PATH, PrivacyHandler);

  return router;
}
