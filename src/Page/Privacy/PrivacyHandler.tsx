import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { FoundationContainer } from '../../Foundation/FoundationContainer';
import { SITE_TITLE } from '../../Application/constants';
import { PrivacyComponent } from './PrivacyComponent';

export const PrivacyHandler = async () => {
  const component = (
    <FoundationContainer title={SITE_TITLE}>
      <PrivacyComponent />
    </FoundationContainer>
  );

  const r = renderToString(component);
  return r;
};
