const clearEvent = new Event("input", { bubbles: true });

$.fn.reactClear = function() {
    this.val("").each(function() { this.dispatchEvent(clearEvent) });
    return this;
}
