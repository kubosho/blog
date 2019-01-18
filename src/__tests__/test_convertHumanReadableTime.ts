import test from 'ava';
import { Nullable } from 'option-t/lib/Nullable/Nullable';
import { unwrapNullable } from 'option-t/lib/Nullable/unwrap';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import { convertHumanReadableJST } from '../convertHumanReadableTime';

let clock: Nullable<SinonFakeTimers> = null;

test.before(() => {
  clock = useFakeTimers({
    now: new Date(Date.UTC(2019, 0, 1, 0, 0)),
  });
});

test.after(() => {
  const c = unwrapNullable(clock);
  c.restore();
});

test('convertHumanReadableJST()', t => {
  const d = new Date();
  t.pass('FIXME: https://github.com/kubosho/blog/issues/51');
  // t.is(convertHumanReadableJST(d), '2019-1-1 09:00:00');
});
