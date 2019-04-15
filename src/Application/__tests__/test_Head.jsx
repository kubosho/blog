import test from 'ava';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Head } from '../Head';

test('<Head />', t => {
  const renderer = new ShallowRenderer();
  const component = <Head />;

  renderer.render(component);

  const r = renderer.getRenderOutput();
  t.snapshot(r);
});
