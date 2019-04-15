import * as React from 'react';
import { Provider } from 'react-redux';
import { appStore } from '../appStore';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

export const Root = ({ children }: Props): JSX.Element => {
  const store = appStore();
  const C = (
    <Provider store={store}>
      <html>{children}</html>
    </Provider>
  );
  return C;
};
