import * as React from 'react';

import { EntryValue } from '../entryValue';
import { HeaderComponent } from '../Application/HeaderComponent';
import { FooterComponent } from '../Application/FooterComponent';

interface Props {
  entry: EntryValue;
}

export const EntryComponent = ({ entry }: Props): JSX.Element => {
  const c = entry.content;

  return (
    <React.Fragment>
      <HeaderComponent />
      <article className="com-Entry-EntryComponent-article" key={entry.id}>
        <h1>{entry.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: c }} />
      </article>
      <FooterComponent />
    </React.Fragment>
  );
};
