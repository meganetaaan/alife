// declare function trace(str: string): void
class Matrix {
    constructor({ height, width }) {
        this.#height = height;
        this.#width = width;
        this.#buffer = new ArrayBuffer(Math.ceil((this.#height * this.#width) / 8));
        this.#view = new DataView(this.#buffer, 0, Math.ceil((this.#height * this.#width) / 8));
    }
    #buffer;
    #view;
    #height;
    #width;
    init() {
        for (let i = 0; i < this.#height * this.#width; i++) {
            this.setBit(i, Math.round(Math.random()));
        }
    }
    getBit(idx) {
        const n = this.#view.getUint8(idx / 8);
        return (n >> idx % 8) & 0b00000001;
    }
    setBit(idx, value) {
        const i = idx / 8;
        const mod = idx % 8;
        const mask = ~(0b00000001 << mod);
        const n = this.#view.getUint8(i);
        this.#view.setUint8(i, (n & mask) | (value << mod));
    }
    get(top, left) {
        const idx = this.#width * top + left;
        return this.getBit(idx);
    }
    set(top, left, value) {
        top = top % this.#height;
        left = left % this.#width;
        this.setBit(this.#width * top + left, value);
    }
    toString() {
        let str = "";
        for (let i = 0; i < this.#height; i++) {
            for (let j = 0; j < this.#width; j++) {
                str += this.getBit(i * this.#width + j) ? "1" : "0";
            }
            str += "\n";
        }
        return str;
    }
}
Object.freeze(Matrix);
class LifeGame {
    constructor(param) {
        this.onTick = () => { };
        this.onInit = () => { };
        this.#height = param?.height ?? LifeGame.DEFAULT_HEIGHT;
        this.#width = param?.width ?? LifeGame.DEFAULT_WIDTH;
        this.#state = new Matrix({ height: this.#height, width: this.#width });
        this.#nextState = new Matrix({ height: this.#height, width: this.#width });
    }
    #height;
    #width;
    #state;
    #nextState;
    get height() {
        return this.#height;
    }
    get width() {
        return this.#width;
    }
    getCell(top, left) {
        return this.#state.get(top, left);
    }
    setCell(top, left, value) {
        this.#state.set(top, left, value);
    }
    init() {
        this.#state.init();
        if (typeof this.onInit === "function") {
            this.onInit(this);
        }
    }
    show() {
        // console.log(this.#state.toString())
    }
    tick() {
        const state = this.#state;
        const nextState = this.#nextState;
        const height = this.#height;
        const width = this.#width;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const t = i;
                const st = t === 0 ? height - 1 : t - 1;
                const gt = t === height - 1 ? 0 : t + 1;
                const l = j;
                const sl = l === 0 ? width - 1 : l - 1;
                const gl = l === width - 1 ? 0 : l + 1;
                const nw = state.get(st, sl);
                const n = state.get(st, l);
                const ne = state.get(st, gl);
                const w = state.get(t, sl);
                const c = state.get(t, l);
                const e = state.get(t, gl);
                const sw = state.get(gt, sl);
                const s = state.get(gt, l);
                const se = state.get(gt, gl);
                const neighborSum = nw + n + ne + w + e + sw + s + se;
                if (c === 0 && neighborSum === 3) {
                    nextState.set(i, j, 1);
                }
                else if (c === 1 && [2, 3].includes(neighborSum)) {
                    nextState.set(i, j, 1);
                }
                else {
                    nextState.set(i, j, 0);
                }
            }
        }
        this.#state = nextState;
        this.#nextState = state;
        if (typeof this.onTick === "function") {
            this.onTick(this);
        }
    }
}
LifeGame.DEFAULT_HEIGHT = 64;
LifeGame.DEFAULT_WIDTH = 64;
Object.freeze(LifeGame);
export { LifeGame as default, Matrix };
