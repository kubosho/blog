import { Router } from 'express';
import { isNull } from 'option-t/lib/Nullable/Nullable';
import { Undefinable, isUndefined } from 'option-t/lib/Undefinable/Undefinable';

import { SITE_TITLE } from './Application/constants';
import { ENTRY_PATH, TOP_PATH, PRIVACY_PATH } from './Application/paths';
import { ViewString } from './Application/ViewString';
import { TopViewString } from './Top/TopViewString';
import { EntryViewString } from './Entry/EntryViewString';
import { PrivacyViewString } from './Privacy/PrivacyViewString';
import { EntryContext } from './entryContext';
import { EntryValue } from './entryValue';

interface EntryPageParams {
  slug: string;
}

async function getEntries(context: EntryContext): Promise<EntryValue[]> {
  const { gateway: entryGateway, store: entryStore } = new EntryContext();

  let entries = entryStore.getEntries();

  if (isNull(entries)) {
    try {
      entries = await entryGateway.fetchAllEntries();
    } catch (err) {
      throw new Error(err);
    }
  }

  return entries;
}

export function route(): Router {
  const router = Router();
  const entryContext = new EntryContext();

  router.get(TOP_PATH, async (req, res) => {
    const entries = await getEntries(entryContext);
    const body = TopViewString(entries);

    res.send(
      ViewString({
        body,
        title: SITE_TITLE,
      }),
    );
  });

  router.get(ENTRY_PATH, async (req, res) => {
    const params: EntryPageParams = req.params;
    const entries = await getEntries(entryContext);
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
