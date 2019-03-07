import { Routes } from 'universal-router';

import { ENTRY_PATH, ENTRY_SLUG_PATH, PRIVACY_PATH } from '../Application/paths';
import { TopHandler } from '../Page/Top/TopHandler';
import { EntryHandler } from '../Page/Entry/EntryHandler';
import { PrivacyHandler } from '../Page/Privacy/PrivacyHandler';

// tslint:disable-next-line no-empty
function noop() {}

export const routes: Routes = [
  {
    path: '',
    action: TopHandler,
  },
  {
    path: ENTRY_PATH,
    action: noop,
    children: [
      {
        path: '',
        action: noop,
      },
      {
        path: ENTRY_SLUG_PATH,
        action: EntryHandler,
      },
    ],
  },
  {
    path: PRIVACY_PATH,
    action: PrivacyHandler,
  },
];
