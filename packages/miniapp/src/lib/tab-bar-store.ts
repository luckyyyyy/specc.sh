/**
 * Minimal reactive store for the custom tab bar selection.
 *
 * WeChat's custom tab bar `onShow` can fire before the page stack has been
 * updated, so reading `Taro.getCurrentPages()` there is unreliable.
 * Instead, each tab page explicitly pushes its own path here in `useDidShow`,
 * and the tab bar subscribes to receive the correct value every time.
 */

type Listener = (path: string) => void;

let _path = "/pages/home/index";
const _listeners = new Set<Listener>();

export const tabBarStore = {
  get: () => _path,

  set(path: string) {
    if (_path === path) return;
    _path = path;
    for (const fn of _listeners) fn(path);
  },

  subscribe(fn: Listener) {
    _listeners.add(fn);
    return () => {
      _listeners.delete(fn);
    };
  },
};
