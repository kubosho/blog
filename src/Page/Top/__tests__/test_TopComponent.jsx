import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { EntryValue } from '../../../Entry/entryValue';
import { TopComponent } from '../TopComponent';

test('TopComponent', t => {
  const renderer = new ShallowRenderer();
  const mockEntryPlainObject = {
    content: 'test content',
    createdAt: '2016-12-20T10:43:35.772Z',
    excerpt: 'test content',
    id: '5KsDBWseXY6QegucYAoacS',
    slug: 'hello-world',
    title: 'Hello, world!',
    updatedAt: '2016-12-20T10:43:35.772Z',
  };
  const mockEntries = [
    mockEntryPlainObject,
    { ...mockEntryPlainObject, publishedAt: '2016-12-20T10:43+09:00' },
    { ...mockEntryPlainObject, publishedAt: '2019-04-01T09:00+09:00' },
  ].map(entry => new EntryValue(entry));
  const component = <TopComponent entries={mockEntries} />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
