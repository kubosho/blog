import * as React from 'react';
import { SITE_TITLE } from './constants';

export const HeaderComponent = (): JSX.Element => (
  <header>
    <h1>{SITE_TITLE}</h1>
  </header>
);
