export function clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function range(n: number) {
    const r = new Array(n);
    for (let i = 0; i < n; i++) {
        r[i] = i;
    }
    return r;
}

