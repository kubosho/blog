import * as React from 'react';
import { Provider } from 'react-redux';
import { appStore } from '../appStore';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
  title: string;
  gaId?: string;
};

export const FoundationContainer = ({ children, title, gaId }: Props): JSX.Element => {
  const store = appStore();

  return (
    <Provider store={store}>
      <html>
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

        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    </Provider>
  );
};
