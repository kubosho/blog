import * as React from 'react';

type Props = {
  title: string;
  gaId?: string;
};

export const Head = ({ title, gaId }: Props): JSX.Element => (
  <head>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/assets/styles/index.css" rel="stylesheet" />
    {!!gaId && (
      <React.Fragment>
        <script>{`window.__gaId__ = ${gaId};`}</script>
        <script defer src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script defer src="/assets/scripts/gaEntryPoint.mjs" type="module" />
      </React.Fragment>
    )}
  </head>
);
