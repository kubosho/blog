import * as React from 'react';
import { SITE_DESCRIPTION } from './constants';

export const FooterComponent = (): JSX.Element => (
  <footer className="com-Application-footer">
    <p className="com-Application-footer__description">{SITE_DESCRIPTION}</p>
  </footer>
);
