import { unwrapMaybe } from 'option-t/lib/Maybe/unwrap';
import { orForMaybe } from 'option-t/lib/Maybe/or';

export interface EntryPlainObject {
  content: string;
  createdAt: string;
  excerpt: string;
  id: string;
  title: string;
  updatedAt: string;
  publishedAt?: string;
  slug?: string;
}

export class EntryValue {
  readonly content: string;
  readonly createdAt: string;
  readonly excerpt: string;
  readonly id: string;
  readonly title: string;
  readonly updatedAt: string;
  readonly slug?: string;

  constructor(param: EntryPlainObject) {
    this.content = unwrapMaybe(param.content);
    this.createdAt = unwrapMaybe(param.createdAt);
    this.excerpt = unwrapMaybe(param.excerpt);
    this.id = unwrapMaybe(param.id);
    this.title = unwrapMaybe(param.title);
    this.updatedAt = unwrapMaybe(param.updatedAt);
    this.slug = orForMaybe(param.slug, null);
  }
}
