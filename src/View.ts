interface ViewParam {
  body: string;
  title: string;
}

export function View({ body, title }: ViewParam) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/assets/styles/index.css" rel="stylesheet">
      </head>

      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
}
