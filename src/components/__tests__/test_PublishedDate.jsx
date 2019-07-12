import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PublishedDate } from '../PublishedDate';

test('PublishedDate', t => {
  const renderer = new ShallowRenderer();
  const mockCreatedAt = '2016-12-20T10:43:35.772Z';
  const component = <PublishedDate createdAt={mockCreatedAt} />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
