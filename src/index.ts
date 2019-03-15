import { config as dotenvConfig } from 'dotenv';
import { ServerResponse, createServer, IncomingMessage } from 'http';
import { extname as getExtName } from 'path';
import { parse as parseURL } from 'url';

import { createRouter } from './Router/router';
import { routes } from './Router/routes';
import { EXTENSIONS } from './extensions';
import { renderAsset } from './renderAsset';

const PORT = process.env.PORT || 8080;

function main() {
  dotenvConfig();

  const server = createServer();
  const router = createRouter(routes);

  server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
    const url = parseURL(req.url);
    const pathname = url.pathname;
    const ext = getExtName(pathname);

    if (isAssetsPath(ext)) {
      renderAsset(__dirname, pathname, req, res);
      return;
    }

    try {
      const val = await router.resolve({ pathname });
      res.write(val);
      res.end();
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(`${pathname} is not found.`);
      res.end();
    }
  });

  if (process.env.RELEASE_CHANNEL === 'local') {
    server.listen(PORT);
    // tslint:disable-next-line no-console
    console.log(`The server is running at port:${PORT}`);
  }
}

main();

function isAssetsPath(path: string): boolean {
  const assetExts = [
    EXTENSIONS.CSS,
    EXTENSIONS.JPEG,
    EXTENSIONS.GIF,
    EXTENSIONS.PNG,
    EXTENSIONS.WEBP,
    EXTENSIONS.SVG,
  ];
  return assetExts.some(ext => ext === path);
}
