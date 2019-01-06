import * as React from 'react';
import { SITE_TITLE } from './constants';

export const HeaderComponent = (): JSX.Element => (
  <header className="com-Application-header">
    <h1 className="com-Application-header__site-title">{SITE_TITLE}</h1>
  </header>
);
