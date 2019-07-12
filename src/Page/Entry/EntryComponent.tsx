import * as React from 'react';
import { unwrapOrFromNullable } from 'option-t/lib/Nullable/unwrapOr';

import { EntryValue } from '../../Entry/entryValue';
import { HeaderComponent } from '../../Application/HeaderComponent';
import { FooterComponent } from '../../Application/FooterComponent';
import { PublishedDate } from '../../components/PublishedDate';

interface Props {
  entry: EntryValue;
}

export const EntryComponent = ({ entry }: Props): JSX.Element => {
  const { content, createdAt, publishdAt } = entry;
  const date = unwrapOrFromNullable(publishdAt, createdAt);

  return (
    <React.Fragment>
      <HeaderComponent />
      <article className="com-Entry-EntryComponent-article" key={entry.id}>
        <header className="com-Entry-EntryComponent-article__header">
          <h1 className="com-Entry-EntryComponent-article__title">{entry.title}</h1>
          <span className="com-Entry-EntryComponent-article__time">
            <PublishedDate createdAt={date} />
          </span>
        </header>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <FooterComponent />
    </React.Fragment>
  );
};
