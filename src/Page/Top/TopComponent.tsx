import * as React from 'react';

import { EntryValue } from '../../entryValue';
import { HeaderComponent } from '../../Application/HeaderComponent';
import { FooterComponent } from '../../Application/FooterComponent';
import { convertHumanReadableJST } from '../../convertHumanReadableTime';

interface Props {
  entries: EntryValue[];
}

export const TopComponent = ({ entries }: Props): JSX.Element => (
  <React.Fragment>
    <HeaderComponent />

    <h2 className="com-Top-TopComponent-articles-title">最近の記事</h2>
    {entries.map(entry => {
      const { createdAt, excerpt, id, slug, title } = entry;
      const dateValue = new Date(createdAt);
      const timeValue = convertHumanReadableJST(dateValue);

      return (
        <section className="com-Top-TopComponent-article" key={id}>
          <h1 className="com-Top-TopComponent-article__title">
            <a href={`/entry/${slug}`}>{title}</a>
          </h1>
          <time dateTime={createdAt}>{timeValue}</time>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      );
    })}

    <FooterComponent />
  </React.Fragment>
);
