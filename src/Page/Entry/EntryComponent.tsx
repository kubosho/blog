import * as React from 'react';

import { EntryValue } from '../../Entry/entryValue';
import { HeaderComponent } from '../../Application/HeaderComponent';
import { FooterComponent } from '../../Application/FooterComponent';
import { convertHumanReadableJST } from '../../convertHumanReadableTime';

interface Props {
  entry: EntryValue;
}

export const EntryComponent = ({ entry }: Props): JSX.Element => {
  const { content, createdAt } = entry;
  const dateValue = new Date(createdAt);
  const timeValue = convertHumanReadableJST(dateValue);

  return (
    <React.Fragment>
      <HeaderComponent />
      <article className="com-Entry-EntryComponent-article" key={entry.id}>
        <header className="com-Entry-EntryComponent-article__header">
          <h1 className="com-Entry-EntryComponent-article__title">{entry.title}</h1>
          <time className="com-Entry-EntryComponent-article__time" dateTime={createdAt}>
            {timeValue}
          </time>
        </header>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <FooterComponent />
    </React.Fragment>
  );
};
