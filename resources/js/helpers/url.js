export function searchParams() {
    return location.search.slice(1).split('&').reduce((memo, val) => {
        const pair = val.split('=');
        return {
            ...memo,
            [pair[0]]: decodeURIComponent(pair[1])
        }
    },{})
}

export function getUrlID() {
    const parts = location.pathname.split(/\//).filter(part => part.length && !isNaN(part));
    return parts.length ? parts[0] : null;
}