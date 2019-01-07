import * as React from 'react';
import { EntryValue } from '../entryValue';
import { HeaderComponent } from '../Application/HeaderComponent';
import { FooterComponent } from '../Application/FooterComponent';

interface Props {
  entries: EntryValue[];
}

export const TopComponent = ({ entries }: Props): JSX.Element => (
  <React.Fragment>
    <HeaderComponent />

    {entries.map(entry => {
      const c = entry.content;

      return (
        <section className="com-Top-TopComponent-article" key={entry.id}>
          <h1>{entry.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: c }} />
        </section>
      );
    })}

    <FooterComponent />
  </React.Fragment>
);
