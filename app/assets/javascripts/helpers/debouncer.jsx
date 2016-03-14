function debounceEvent(func, wait) {
    var timeout;
    return function(_e) {
        var context = this, e = Object.assign({}, _e);
        var later = function() {
            timeout = null;
            func.apply(context, [e]);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
