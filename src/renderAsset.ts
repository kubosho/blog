import { readFile, stat as statFile } from 'fs';
import { join as joinPath, parse as parsePath } from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { EXTENSIONS } from './extensions';
import { MINE_TYPES } from './mineTypes';

const mimeType: { [key: string]: string } = {
  [EXTENSIONS.HTML]: MINE_TYPES.HTML,
  [EXTENSIONS.MJS]: MINE_TYPES.MJS,
  [EXTENSIONS.JS]: MINE_TYPES.JS,
  [EXTENSIONS.JSON]: MINE_TYPES.JSON,
  [EXTENSIONS.CSS]: MINE_TYPES.CSS,
  [EXTENSIONS.JPEG]: MINE_TYPES.JPEG,
  [EXTENSIONS.GIF]: MINE_TYPES.GIF,
  [EXTENSIONS.PNG]: MINE_TYPES.PNG,
  [EXTENSIONS.WEBP]: MINE_TYPES.WEBP,
  [EXTENSIONS.SVG]: MINE_TYPES.SVG,
};

export function renderAsset(
  root: string,
  pathname: string,
  req: IncomingMessage,
  res: ServerResponse,
) {
  const filename = joinPath(root, pathname);

  statFile(filename, (err, stat) => {
    if (err) {
      // tslint:disable-next-line: no-console
      console.error(err.message);
      res.end();
      return;
    }

    const mtime = new Date(stat.mtimeMs).toUTCString();
    if (req.headers['if-modified-since'] === mtime) {
      res.statusCode = 304;
      res.end();
      return;
    }

    readFile(filename, (e, data) => {
      if (e) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${e}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = parsePath(pathname).ext;
        res.statusCode = 200;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain');
        res.setHeader('Last-Modified', mtime);
        res.setHeader('Content-Length', stat.size);
        res.end(data);
      }
    });
  });
}
