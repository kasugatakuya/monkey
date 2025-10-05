// シンプルなメモリキャッシュの実装
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL = 60 * 1000; // デフォルト: 60秒

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now - item.timestamp > this.defaultTTL) {
      this.cache.delete(key);
      return null;
    }

    console.log(`キャッシュヒット: ${key}`);
    return item.data as T;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    // TTLが指定されている場合は自動削除を設定
    if (ttl) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttl);
    }
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// シングルトンインスタンス
export const cache = new MemoryCache();