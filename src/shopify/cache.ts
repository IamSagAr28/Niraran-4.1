// src/shopify/cache.ts
// Smart caching system for Shopify data with TTL and invalidation

import type { CachedData } from './types';
import { safeLocalStorage } from '../utils/storage';

const CACHE_PREFIX = 'shopify_cache_';
const DEFAULT_TTL = 60 * 1000; // 60 seconds
const MEMORY_CACHE = new Map<string, CachedData<any>>();

/**
 * Generates a cache key from operation name and variables
 */
function generateCacheKey(operationName: string, variables?: Record<string, any>): string {
  const varString = variables ? JSON.stringify(variables) : '';
  return `${CACHE_PREFIX}${operationName}_${varString}`;
}

/**
 * Check if cached data is still valid (not expired)
 */
function isCacheValid(cachedData: CachedData<any>): boolean {
  return Date.now() - cachedData.timestamp < cachedData.ttl;
}

/**
 * Get data from cache (memory first, then localStorage)
 */
export function getFromCache<T>(operationName: string, variables?: Record<string, any>): T | null {
  const key = generateCacheKey(operationName, variables);

  // Check memory cache first (faster)
  if (MEMORY_CACHE.has(key)) {
    const cached = MEMORY_CACHE.get(key);
    if (cached && isCacheValid(cached)) {
      console.log(`✅ Cache hit (memory): ${operationName}`);
      return cached.data;
    } else {
      MEMORY_CACHE.delete(key);
    }
  }

  // Check localStorage
  const stored = safeLocalStorage.getItem(key);
  if (stored) {
    try {
      const cached: CachedData<T> = JSON.parse(stored);
      if (isCacheValid(cached)) {
        console.log(`✅ Cache hit (storage): ${operationName}`);
        // Also store in memory cache for next access
        MEMORY_CACHE.set(key, cached);
        return cached.data;
      } else {
        safeLocalStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error parsing cached data:', error);
      safeLocalStorage.removeItem(key);
    }
  }

  console.log(`❌ Cache miss: ${operationName}`);
  return null;
}

/**
 * Store data in cache (both memory and localStorage)
 */
export function setInCache<T>(
  operationName: string,
  data: T,
  ttl: number = DEFAULT_TTL,
  variables?: Record<string, any>
): void {
  const key = generateCacheKey(operationName, variables);
  const cacheEntry: CachedData<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  // Store in memory cache
  MEMORY_CACHE.set(key, cacheEntry);

  // Store in localStorage for persistence
  safeLocalStorage.setItem(key, JSON.stringify(cacheEntry));
}

/**
 * Invalidate cache for a specific operation
 */
export function invalidateCache(operationName: string, variables?: Record<string, any>): void {
  const key = generateCacheKey(operationName, variables);
  MEMORY_CACHE.delete(key);
  safeLocalStorage.removeItem(key);
  console.log(`🔄 Cache invalidated: ${operationName}`);
}

/**
 * Clear all Shopify cache
 */
export function clearAllCache(): void {
  // Clear memory cache
  MEMORY_CACHE.clear();

  // Clear localStorage
  const keys = safeLocalStorage.keys();
  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      safeLocalStorage.removeItem(key);
    }
  });
  console.log('🗑️ All Shopify cache cleared');
}

/**
 * Get cache statistics (for debugging)
 */
export function getCacheStats() {
  const keys = safeLocalStorage.keys().filter((k) => k.startsWith(CACHE_PREFIX));
  return {
    memoryCacheSize: MEMORY_CACHE.size,
    storageCacheSize: keys.length,
    storageKeys: keys,
  };
}

/**
 * Watch for storage changes in other tabs (optional)
 * Useful for multi-tab consistency
 */
export function watchCacheChanges(callback: () => void): () => void {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key?.startsWith(CACHE_PREFIX)) {
      callback();
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}

// Cleanup expired cache periodically (run once on app start)
export function initCacheCleanup(interval: number = 5 * 60 * 1000): void {
  // Clean every 5 minutes by default
  setInterval(() => {
    const keys = safeLocalStorage.keys();
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        const stored = safeLocalStorage.getItem(key);
        if (stored) {
          try {
            const cached: CachedData<any> = JSON.parse(stored);
            if (!isCacheValid(cached)) {
              safeLocalStorage.removeItem(key);
            }
          } catch (e) {
            safeLocalStorage.removeItem(key);
          }
        }
      }
    });
  }, interval);
}
