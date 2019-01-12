import * as express from 'express';

import { EntryValue } from '../entryValue';
import { SITE_TITLE } from '../Application/constants';
import { TOP_PATH } from '../Application/paths';
import { View } from '../View';
import { TopViewString } from './TopViewString';

export function topRouteHander(router: express.Router, entries: EntryValue[]) {
  router.get(TOP_PATH, (req, res) => {
    const body = TopViewString(entries);

    res.send(
      View({
        body,
        title: SITE_TITLE,
      }),
    );
  });
}
