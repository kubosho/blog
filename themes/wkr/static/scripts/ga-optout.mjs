const DO_NOT_TRACK_VALUE = {
  no: '0',
  yes: '1',
  unspecified: 'unspecified',
};
const GA_ID_STORAGE_KEY = 'gaId';

export default class GAOptout {
  constructor(storage) {
    this._gaId = '';
    this._storage = storage || {};
  }

  set gaId(id) {
    this._gaId = id;
  }

  get gaOptoutKey() {
    return `ga-disable-${this._gaId}`;
  }

  disableGA() {
    window[this.gaOptoutKey] = true;

    if (this._storage.getKey() === null) {
      this._storage.saveKey(this.gaOptoutKey);
    }
  }

  enableGA() {
    window[this.gaOptoutKey] = false;

    if (this._storage.getKey() !== null) {
      this._storage.deleteKey(this.gaOptoutKey);
    }
  }

  isGADisabled() {
    return (
      window[this.gaOptoutKey] ||
      this._storage.getKey() !== null ||
      this._isDoNotTrackEnabled()
    );
  }

  _isDoNotTrackEnabled() {
    return navigator.doNotTrack === DO_NOT_TRACK_VALUE.yes;
  }
}

export class GAOptoutKeyStorage {
  getKey() {
    return localStorage.getItem(GA_ID_STORAGE_KEY);
  }

  saveKey(value) {
    localStorage.setItem(GA_ID_STORAGE_KEY, value);
  }

  deleteKey(value) {
    localStorage.removeItem(GA_ID_STORAGE_KEY);
  }
}
