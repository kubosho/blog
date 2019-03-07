import { Routes, default as UniversalRouter } from 'universal-router';

export function createRouter(routes: Routes): UniversalRouter {
  const router = new UniversalRouter(routes);
  return router;
}
