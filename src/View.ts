interface ViewParam {
  body: string;
  title: string;
}

export function View({ body, title }: ViewParam) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
}
