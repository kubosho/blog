import { Nullable } from 'option-t/lib/Nullable/Nullable';

export interface Memoization<K extends object, V> {
  get: (key: K) => Nullable<V>;
  set: (key: K, value: V) => void;
}

class MemoizationImpl<K extends object, V> implements Memoization<K, V> {
  private _map: WeakMap<K, V>;

  constructor() {
    this._map = new WeakMap();
  }

  get(key: K): Nullable<V> {
    let r = null;

    if (this._map.has(key)) {
      r = this._map.get(key);
    }

    return r;
  }

  set(key: K, value: V) {
    this._map.set(key, value);
  }
}

export function createMemoization(): Memoization<any, any> {
  const r = new MemoizationImpl();
  return r;
}
