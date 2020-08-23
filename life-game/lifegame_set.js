function top(cell) {
    return cell >> 8;
}
function left(cell) {
    return cell & 0xff;
}
function cell(top, left) {
    return (top << 8) | left;
}
function countNeighbors(c, cs, h, w) {
    const t = top(c);
    const st = t === 0 ? h - 1 : t - 1;
    const gt = t === h - 1 ? 0 : t + 1;
    const l = left(c);
    const sl = l === 0 ? w - 1 : l - 1;
    const gl = l === w - 1 ? 0 : l + 1;
    const count = Number(cs.has(cell(st, sl))) +
        Number(cs.has(cell(t, sl))) +
        Number(cs.has(cell(gt, sl))) +
        Number(cs.has(cell(st, l))) +
        Number(cs.has(cell(gt, l))) +
        Number(cs.has(cell(st, gl))) +
        Number(cs.has(cell(t, gl))) +
        Number(cs.has(cell(gt, gl)));
    return count;
}
function survive(c, cs, h, w) {
    const nadj = countNeighbors(c, cs, h, w);
    return nadj === 3 || (cs.has(c) && nadj === 2);
}
function addNeighbors(c, cs, h, w) {
    const t = top(c);
    const st = t === 0 ? h - 1 : t - 1;
    const gt = t === h - 1 ? 0 : t + 1;
    const l = left(c);
    const sl = l === 0 ? w - 1 : l - 1;
    const gl = l === w - 1 ? 0 : l + 1;
    cs.add(cell(st, sl));
    cs.add(cell(t, sl));
    cs.add(cell(gt, sl));
    cs.add(cell(st, l));
    cs.add(cell(gt, l));
    cs.add(cell(st, gl));
    cs.add(cell(t, gl));
    cs.add(cell(gt, gl));
}
class LifeGame {
    constructor({ height, width }) {
        this.#cells = new Set();
        this.#width = width;
        this.#height = height;
    }
    #cells;
    #width;
    #height;
    get width() {
        return this.#width;
    }
    get height() {
        return this.height;
    }
    get cells() {
        return this.#cells;
    }
    init(p = 0.3) {
        const cs = new Set();
        for (let i = 0; i < this.#height; i++) {
            for (let j = 0; j < this.#width; j++) {
                if (Math.random() > 1 - p) {
                    cs.add(cell(i, j));
                }
            }
        }
        this.#cells = cs;
    }
    tick() {
        const current = this.#cells;
        const next = new Set();
        current.forEach((c) => {
            addNeighbors(c, next, this.#height, this.#width);
        });
        next.forEach((c) => {
            if (!survive(c, current, this.#height, this.#width)) {
                next.delete(c);
            }
        });
        this.#cells = next;
    }
}
LifeGame.top = top;
LifeGame.left = left;
export { LifeGame };
