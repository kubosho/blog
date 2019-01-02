import * as React from 'react';
import { EntryValue } from '../entryValue';

interface Props {
  entries: EntryValue[];
}

export const TopComponent = ({ entries }: Props): JSX.Element => (
  <React.Fragment>
    {entries.map(entry => (
      <section key={entry.id}>
        <h1>{entry.title}</h1>
        {entry.content}
      </section>
    ))}
  </React.Fragment>
);
