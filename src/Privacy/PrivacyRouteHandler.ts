import { Router } from 'express';

import { SITE_TITLE } from '../Application/constants';
import { PRIVACY_PATH } from '../Application/paths';
import { View } from '../View';
import { PrivacyViewString } from './PrivacyViewString';

export function privacyRouteHander(router: Router) {
  router.get(PRIVACY_PATH, (req, res) => {
    const body = PrivacyViewString();

    res.send(
      View({
        body,
        title: SITE_TITLE,
      }),
    );
  });
}