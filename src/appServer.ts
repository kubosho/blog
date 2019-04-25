import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import { extname as getExtName } from 'path';
import { parse as parseURL } from 'url';
import { default as UniversalRouter } from 'universal-router';

import { EXTENSIONS } from './extensions';
import { renderAsset } from './renderAsset';

export class AppServer {
  private _router: UniversalRouter;
  private _server: Server;

  constructor(router: UniversalRouter) {
    this._router = router;
    this._server = createServer();

    this._server.on('request', (req: IncomingMessage, res: ServerResponse) =>
      this.onRequest(req, res),
    );
  }

  listen(port: number) {
    this._server.listen(port);
  }

  async onRequest(req: IncomingMessage, res: ServerResponse) {
    const url = parseURL(req.url);
    const pathname = url.pathname;
    const ext = getExtName(pathname);

    if (isAssetsPath(ext)) {
      renderAsset(__dirname, pathname, req, res);
      return;
    }

    try {
      const val = await this._router.resolve({ pathname });
      res.write(val);
      res.end();
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(`${pathname} is not found.`);
      res.end();
    }
  }
}

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
