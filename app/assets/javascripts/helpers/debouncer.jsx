/* eslint func-names: 0 */
function debounceEvent(func, wait) {
  let timeout;
  return function (_e) {
    const context = this;
    const e = Object.assign({}, _e);
    const later = function () {
      timeout = null;
      func.apply(context, [e]);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
