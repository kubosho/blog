interface ViewParam {
  body: string;
  title: string;
}

export function View({ body, title }: ViewParam) {
  const { gaId } = process.env;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/assets/styles/index.css" rel="stylesheet">
        <script>
          window.__gaId__ = ${gaId};
        </script>
        <script defer src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
        <script defer src="/assets/scripts/gaEntryPoint.mjs" type="module"></script>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
}
