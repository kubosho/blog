import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { Root } from '../../Application/Root';
import { Head } from '../../Application/Head';
import { Body } from '../../Application/Body';
import { SITE_TITLE } from '../../Application/constants';
import { PrivacyComponent } from './PrivacyComponent';

export const PrivacyHandler = async () => {
  const component = (
    <Root>
      <Head title={SITE_TITLE} />
      <Body>
        <PrivacyComponent />
      </Body>
    </Root>
  );

  const r = renderToString(component);
  return r;
};
