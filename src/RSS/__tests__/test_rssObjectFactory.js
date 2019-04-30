import test from 'ava';
import { EntryValue } from '../../Entry/entryValue';
import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION } from '../../Application/constants';
import { ENTRY_PATH } from '../../Application/paths';
import { createRSSObject } from '../rssObjectFactory';

test('rssObjectFactory()', t => {
  const mockEntryPlainObject = {
    content: 'test content',
    createdAt: '2016-12-20T10:43:35.772Z',
    excerpt: 'test content',
    id: '5KsDBWseXY6QegucYAoacS',
    slug: 'hello-world',
    title: 'Hello, world!',
    updatedAt: '2016-12-20T10:43:35.772Z',
  };
  const mockEntries = [
    mockEntryPlainObject,
    { ...mockEntryPlainObject, publishedAt: '2016-12-20T10:43+09:00' },
    { ...mockEntryPlainObject, publishedAt: '2019-04-01T09:00+09:00' },
  ].map(entry => new EntryValue(entry));
  const actual = createRSSObject(mockEntries);
  const { channel, items } = actual;

  t.is(channel.title, SITE_TITLE);
  t.is(channel.link, SITE_URL);
  t.is(channel.description, SITE_DESCRIPTION);

  const item = items[0];
  t.is(item.title, 'Hello, world!');
  t.is(item.description, 'test content');
  t.is(item.pubDate, '2016-12-20T10:43:35.772Z');
  t.is(item.link, `${SITE_URL}/${ENTRY_PATH}/hello-world`);
});
