import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PublishedDate } from '../PublishedDate';

test('PublishedDate', t => {
  const renderer = new ShallowRenderer();
  const mockCreatedAt = 1482230615772;
  const component = <PublishedDate createdAt={mockCreatedAt} />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
