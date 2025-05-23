export function qs(selector, scope = document) {
    return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
    return [...scope.querySelectorAll(selector)];
}

export function on(event, selector, handler, scope = document) {
    scope.addEventListener(event, e => {
        if (e.target.matches(selector)) handler(e);
    });
}