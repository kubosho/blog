import { localEntryPoint } from './localEntryPoint';

if (process.env.RELEASE_CHANNEL === 'local') {
  localEntryPoint();
} else {
  // do anything
}
