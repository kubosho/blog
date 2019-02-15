import { Request, Response } from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { FoundationComponent } from '../../Application/FoundationComponent';
import { SITE_TITLE } from '../../Application/constants';
import { PrivacyComponent } from './PrivacyComponent';

export const PrivacyHandler = async (_req: Request, res: Response) => {
  const component = (
    <FoundationComponent title={SITE_TITLE}>
      <PrivacyComponent />
    </FoundationComponent>
  );

  renderToNodeStream(component).pipe(res);
};
