

import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

// Filter console errors to suppress expected errors
const originalError = console.error;
console.error = (...args: any[]) => {
  const message = args.join(' ');
  // Suppress expected 401 errors from /api/me
  if (message.includes('/api/me') && message.includes('401')) {
    return;
  }
  // Suppress storage-related errors
  if (message.toLowerCase().includes('storage') || message.toLowerCase().includes('context')) {
    return;
  }
  // Call original for other errors
  originalError.apply(console, args);
};

// Comprehensive localStorage/sessionStorage patch for restricted environments
(function () {
  function createStorageMock() {
    const data = new Map();
    return {
      getItem: function (key) { return data.get(key) || null; },
      setItem: function (key, value) { data.set(key, String(value)); },
      removeItem: function (key) { data.delete(key); },
      clear: function () { data.clear(); },
      key: function (i) { return Array.from(data.keys())[i] || null; },
      get length() { return data.size; }
    };
  }

  function testStorage(storage) {
    try {
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Test and patch localStorage
  if (!testStorage(window.localStorage)) {
    console.warn('LocalStorage access denied. Using in-memory fallback.');
    Object.defineProperty(window, 'localStorage', {
      value: createStorageMock(),
      configurable: true,
      writable: true
    });
  }

  // Test and patch sessionStorage
  if (!testStorage(window.sessionStorage)) {
    console.warn('SessionStorage access denied. Using in-memory fallback.');
    Object.defineProperty(window, 'sessionStorage', {
      value: createStorageMock(),
      configurable: true,
      writable: true
    });
  }
})();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="top-right" richColors />
  </>
);
