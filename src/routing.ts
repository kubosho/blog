import { ContentfulClientApi } from 'contentful';
import * as express from 'express';
import { fetchEntries } from './entriesGateway';
import { SITE_TITLE } from './Application/constants';
import { TopViewString } from './Top/TopViewString';
import { View } from './View';

export function route(app: express.Express, client: ContentfulClientApi) {
  app.use('/assets', express.static('assets'));

  app.get('/', async (req, res) => {
    try {
      const entries = await fetchEntries(client);
      const body = TopViewString(entries);

      res.send(
        View({
          body,
          title: SITE_TITLE,
        }),
      );
    } catch (err) {
      throw new Error(err);
    }
  });
}
