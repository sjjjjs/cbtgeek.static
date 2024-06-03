
export function delay(ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function noop() { }

export function animateScrollTo(id) {
    if (typeof window === 'object') {
        const el = window.document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }
}
export function parseBreadcrumb(path) {
    const result = [];
    let cpath = '';
    const list = path.replace(/\.html$/, '').split('/').map(i => decodeURIComponent(i));
    for (let i = 0; i < list.length; i++) {
        const tail = (i === list.length - 1);
        const item = list[i];
        if (i === 0) {
            result.push({
                name: 'Home',
                path: '/'
            });
        } else {
            cpath += `/${item}`;
            result.push({
                name: item.toUpperCase(),
                path: cpath + (!tail ? '/' : '')
            });
        }
    }
    return result;
}