import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Root } from '../Root';

test('<Root />', t => {
  const renderer = new ShallowRenderer();
  const component = <Root />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
