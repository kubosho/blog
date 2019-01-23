import * as express from 'express';
import { Undefinable, isUndefined } from 'option-t/lib/Undefinable/Undefinable';

import { SITE_TITLE } from '../Application/constants';
import { ENTRY_PATH } from '../Application/paths';
import { ViewString } from '../Application/ViewString';
import { EntryValue } from '../entryValue';
import { EntryViewString } from './EntryViewString';

interface EntryPageParams {
  slug: string;
}

export function entryRouteHander(router: express.Router, entries: EntryValue[]) {
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
}
