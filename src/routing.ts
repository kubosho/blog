import { Router } from 'express';
import { Undefinable, isUndefined } from 'option-t/lib/Undefinable/Undefinable';

import { SITE_TITLE } from './Application/constants';
import { ENTRY_PATH, TOP_PATH, PRIVACY_PATH } from './Application/paths';
import { ViewString } from './Application/ViewString';
import { TopViewString } from './Top/TopViewString';
import { EntryViewString } from './Entry/EntryViewString';
import { PrivacyViewString } from './Privacy/PrivacyViewString';
import { EntryValue } from './entryValue';

interface EntryPageParams {
  slug: string;
}

export function route(entries: EntryValue[]): Router {
  const router = Router();

  router.get(TOP_PATH, (req, res) => {
    const body = TopViewString(entries);

    res.send(
      ViewString({
        body,
        title: SITE_TITLE,
      }),
    );
  });

  router.get(ENTRY_PATH, (req, res) => {
    const params: EntryPageParams = req.params;
    const entry: Undefinable<EntryValue> = entries.find(e => e.slug === params.slug);

    const body = EntryViewString(entry);

    if (!isUndefined(entry)) {
      res.send(
        ViewString({
          body,
          title: `${entry.title} · ${SITE_TITLE}`,
        }),
      );
    }
  });

  router.get(PRIVACY_PATH, (req, res) => {
    const body = PrivacyViewString();

    res.send(
      ViewString({
        body,
        title: SITE_TITLE,
      }),
    );
  });

  return router;
}
