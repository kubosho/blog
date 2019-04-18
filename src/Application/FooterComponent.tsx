import * as React from 'react';
import { SITE_DESCRIPTION } from './constants';

export const FooterComponent = (): JSX.Element => (
  <footer className="com-Application-footer">
    <div>
      <img
        src="/assets/images/icon.jpg"
        alt="このブログを作った人のアイコン"
        width="60"
        height="60"
      />
      <p className="com-Application-footer__description">{SITE_DESCRIPTION}</p>
    </div>
  </footer>
);
