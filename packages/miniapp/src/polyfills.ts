/**
 * WeChat miniapp polyfills
 * Must be imported before any library that uses browser APIs
 */

// AbortController is not available in WeChat miniapp runtime
if (typeof globalThis.AbortController === "undefined") {
  class AbortSignal {
    aborted = false;
    reason: unknown = undefined;
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
      return true;
    }
    throwIfAborted() {
      if (this.aborted) throw this.reason;
    }
    onabort: null = null;
  }

  globalThis.AbortController = class AbortController {
    signal = new AbortSignal();
    abort(reason?: unknown) {
      this.signal.aborted = true;
      this.signal.reason = reason;
    }
  };
}
