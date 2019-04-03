// @ts-ignore
import { default as marked } from 'marked';
import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { ContentfulCustomEntryFields, EntryPlainObject, EntryValue } from './entryValue';
import { Sys } from 'contentful';

export function toEntryPlainObject(
  sys: Sys,
  fields: ContentfulCustomEntryFields,
): EntryPlainObject {
  const content = marked(fields.content);
  const createdAt = unwrapOrFromUndefinable(fields.publishedAt, sys.createdAt);
  const updatedAt = sys.updatedAt;
  const excerpt = createExcerptText(fields);

  const res: EntryPlainObject = {
    ...sys,
    ...fields,
    content,
    createdAt: createDate(createdAt),
    updatedAt: createDate(updatedAt),
    excerpt,
  };

  return res;
}

export function toEntryValue(plainObject: EntryPlainObject): EntryValue {
  const v = new EntryValue(plainObject);
  return v;
}

function createDate(date: string): Date {
  const d = new Date(date);
  return d;
}

function createExcerptText(fields: ContentfulCustomEntryFields): string {
  const excerpt = fields.excerpt;
  const contentExcerpt = stripParagraphElement(marked(fields.content.split('\n')[0]));

  const r = unwrapOrFromUndefinable(excerpt, contentExcerpt);
  return r;
}

function stripParagraphElement(content: string): string {
  return content.replace(/<\/?p>/g, '');
}
