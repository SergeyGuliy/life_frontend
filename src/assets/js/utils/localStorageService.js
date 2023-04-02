export class LocalStorageService {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }

  get value() {
    return localStorage.getItem(this.storageKey);
  }
  set value(val) {
    localStorage.setItem(this.storageKey, val);
  }
}
