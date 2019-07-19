import { unwrapMaybe } from 'option-t/lib/Maybe/unwrap';
import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { parseISOFormat } from '../Application/date';

export interface ContentfulCustomEntryFields {
  content: string;
  excerpt: string;
  slug: string;
  tags: Array<string>;
  title: string;
  publishedAt?: string;
}

export interface EntryResponse {
  content: string;
  excerpt: string;
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface EntryPlainObject {
  content: string;
  excerpt: string;
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export class EntryValue {
  readonly content: string;
  readonly excerpt: string;
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(param: EntryPlainObject) {
    const c = unwrapOrFromUndefinable(param.publishedAt, param.createdAt);
    const u = unwrapMaybe(param.updatedAt);

    const createdAt = parseISOFormat(c).toMillis();
    const updatedAt = parseISOFormat(u).toMillis();

    this.content = unwrapMaybe(param.content);
    this.excerpt = unwrapMaybe(param.excerpt);
    this.id = unwrapMaybe(param.id);
    this.slug = unwrapMaybe(param.slug);
    this.title = unwrapMaybe(param.title);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
