export function rejectAfter(obj, ms) {
    return new Promise((res, rej) => {
        setTimeout(() => rej(obj), ms)
    });
}