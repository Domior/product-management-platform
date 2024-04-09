class LocalStorageService {
  static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageService;
