import { RSSObject } from './rssObjectFactory';

type XMLString = string;

export function toXMLString(rssObj: RSSObject): XMLString {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    ${createMetaXMLString(rssObj)}
    ${createItemsXMLString(rssObj)}
  </channel>
</rss>`;
}

function createMetaXMLString(rssObj: RSSObject): XMLString {
  const { title, description, link } = rssObj.channel;

  return `<title>${title}</title>
<link>${link}</link>
<description>${description}</description>`;
}

function createItemsXMLString(rssObj: RSSObject): XMLString {
  const { items } = rssObj;

  const xmlStrings = items.map(
    item =>
      `<item>
  <title>${item.title}</title>
  <link>${item.link}</link>
  <description>${item.description}</description>
  <pubDate>${item.pubDate}</pubDate>
</item>`,
  );

  return xmlStrings.join('\n');
}
