/**
 * Safe wrapper for localStorage to handle cases where storage access is blocked
 * (e.g. incognito mode, third-party cookies blocked, iframes)
 */

// In-memory fallback store
const memoryStore: Record<string, string> = {};

export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        try {
            // Try to use real localStorage
            return localStorage.getItem(key);
        } catch (e) {
            // Fallback to memory store
            return memoryStore[key] || null;
        }
    },

    setItem: (key: string, value: string): void => {
        try {
            // Try to use real localStorage
            localStorage.setItem(key, value);
        } catch (e) {
            // Fallback to memory store
            memoryStore[key] = value;
        }
    },

    removeItem: (key: string): void => {
        try {
            // Try to use real localStorage
            localStorage.removeItem(key);
        } catch (e) {
            // Fallback to memory store
            delete memoryStore[key];
        }
    },

    keys: (): string[] => {
        try {
            // Try to use real localStorage
            return Object.keys(localStorage);
        } catch (e) {
            // Fallback to memory store
            return Object.keys(memoryStore);
        }
    }
};
