import { unwrapMaybe } from 'option-t/lib/Maybe/unwrap';

export interface ContentfulCustomEntryFields {
  content: string;
  excerpt: string;
  slug: string;
  tags: Array<string>;
  title: string;
  publishedAt?: string;
}

export interface EntryPlainObject {
  content: string;
  createdAt: string;
  excerpt: string;
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  publishedAt?: string;
}

export class EntryValue {
  readonly content: string;
  readonly createdAt: string;
  readonly excerpt: string;
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly updatedAt: string;

  constructor(param: EntryPlainObject) {
    this.content = unwrapMaybe(param.content);
    this.createdAt = unwrapMaybe(param.createdAt);
    this.excerpt = unwrapMaybe(param.excerpt);
    this.id = unwrapMaybe(param.id);
    this.slug = unwrapMaybe(param.slug);
    this.title = unwrapMaybe(param.title);
    this.updatedAt = unwrapMaybe(param.updatedAt);
  }
}
