import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { PrivacyComponent } from './PrivacyComponent';

export function PrivacyViewString(): string {
  return renderToString(<PrivacyComponent />);
}
