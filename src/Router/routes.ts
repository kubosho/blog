import { Routes } from 'universal-router';

import { ENTRY_PATH, ENTRY_SLUG_PATH, PRIVACY_PATH, FEED_PATH } from '../Application/paths';
import { TopHandler } from '../Page/Top/topHandler';
import { EntryHandler } from '../Page/Entry/entryHandler';
import { PrivacyHandler } from '../Page/Privacy/privacyHandler';
import { feedHandler } from '../Page/Feed/feedHandler';

// tslint:disable-next-line no-empty
function noop() {}

export const routes: Routes = [
  {
    path: '',
    action: TopHandler,
  },
  {
    path: FEED_PATH,
    action: feedHandler,
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
