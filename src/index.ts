import { mapOrForUndefinable } from 'option-t/lib/Undefinable/mapOr';
import { createRouter } from './Router/router';
import { routes } from './Router/routes';
import { AppServer } from './appServer';

const PORT = mapOrForUndefinable(process.env.PORT, 8080, p => Number(p));

function main() {
  const router = createRouter(routes);
  const server = new AppServer(router);

  if (process.env.RELEASE_CHANNEL === 'local') {
    server.listen(PORT);
    // tslint:disable-next-line no-console
    console.log(`The server is running at port:${PORT}`);
  }
}

main();
