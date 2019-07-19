import test from 'ava';

import { EntryValue } from '../entryValue';

test('EntryValue', t => {
  const param = {
    content: 'test content',
    excerpt: 'test content',
    id: '5KsDBWseXY6QegucYAoacS',
    slug: 'hello-world',
    title: 'Hello, world!',
    createdAt: '2016-12-20T10:43:35.772Z',
    updatedAt: '2016-12-20T10:43:35.772Z',
    publishedAt: '2015-07-19T21:00:00.772Z',
  }

  const actual = new EntryValue(param);

  t.is(actual.content, param.content);
  t.is(actual.excerpt, param.excerpt);
  t.is(actual.id, param.id);
  t.is(actual.slug, param.slug);
  t.is(actual.title, param.title);

  t.is(actual.createdAt, 1437339600772);
  t.is(actual.updatedAt, 1482230615772);
});
