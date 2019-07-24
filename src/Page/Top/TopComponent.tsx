import * as React from 'react';

import { EntryValue } from '../../Entry/entryValue';
import { HeaderComponent } from '../../Application/HeaderComponent';
import { FooterComponent } from '../../Application/FooterComponent';
import { PublishedDate } from '../../components/PublishedDate';

export interface TopComponentProps {
  entries: ReadonlyArray<EntryValue>;
}

export const TopComponent = ({ entries }: TopComponentProps): JSX.Element => (
  <React.Fragment>
    <HeaderComponent />

    <h2 className="com-Top-TopComponent-articles-title">最近の記事</h2>

    {entries.map(entry => {
      const { createdAt, excerpt, id, slug, title } = entry;

      return (
        <section className="com-Top-TopComponent-article" key={id}>
          <h1 className="com-Top-TopComponent-article__title">
            <a href={`/entry/${slug}`}>{title}</a>
          </h1>
          <PublishedDate createdAt={createdAt} />
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      );
    })}

    <FooterComponent />
  </React.Fragment>
);
