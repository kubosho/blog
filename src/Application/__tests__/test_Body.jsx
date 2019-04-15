import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Body } from '../Body';

test('<Body />', t => {
  const renderer = new ShallowRenderer();
  const component = <Body />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
