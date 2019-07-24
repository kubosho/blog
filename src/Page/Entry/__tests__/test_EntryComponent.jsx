import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { EntryValue } from '../../../Entry/entryValue';
import { EntryComponent } from '../EntryComponent';

test('EntryComponent', t => {
  const renderer = new ShallowRenderer();
  const mockEntryPlainObject = {
    content: 'test content',
    excerpt: 'test content',
    id: '5KsDBWseXY6QegucYAoacS',
    slug: 'hello-world',
    title: 'Hello, world!',
    createdAt: '2016-12-20T10:43:35.772Z',
    updatedAt: '2016-12-20T10:43:35.772Z',
  };

  const mockEntryValue = new EntryValue(mockEntryPlainObject);
  const component = <EntryComponent entry={mockEntryValue} />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
