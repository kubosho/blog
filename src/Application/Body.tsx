import * as React from 'react';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

export const Body = ({ children }: Props): JSX.Element => <body>{children}</body>;
