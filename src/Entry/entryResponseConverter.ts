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
  const excerpt = createExcerptText(fields);

  const res: EntryPlainObject = {
    ...sys,
    ...fields,
    content,
    excerpt,
  };

  return res;
}

export function toEntryValue(plainObject: EntryPlainObject): EntryValue {
  const v = new EntryValue(plainObject);
  return v;
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
