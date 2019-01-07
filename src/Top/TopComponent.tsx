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
      const ex = entry.excerpt;

      return (
        <section className="com-Top-TopComponent-article" key={entry.id}>
          <h1>{entry.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: ex }} />
        </section>
      );
    })}

    <FooterComponent />
  </React.Fragment>
);
