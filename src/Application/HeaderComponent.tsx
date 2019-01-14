import * as React from 'react';
import { SITE_TITLE } from './constants';
import { TOP_PATH } from './paths';

export const HeaderComponent = (): JSX.Element => (
  <header className="com-Application-header">
    <h1 className="com-Application-header__site-title">
      <a href={TOP_PATH}>{SITE_TITLE}</a>
    </h1>
  </header>
);
