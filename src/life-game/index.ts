const HEIGHT = 50;
const WIDTH = 50;

class Matrix {
  #matrix: Uint8Array;
  #height: number;
  #width: number;
  constructor({ height, width }: { height: number; width: number }) {
    this.#matrix = new Uint8Array(height * width);
    this.#height = height;
    this.#width = width;
  }
  get(top: number, left: number): number {
    top = top % this.#height;
    left = left % this.#width;
    return this.#matrix[this.#width * top + left];
  }
  set(top: number, left: number, value: number): void {
    top = top % this.#height;
    left = left % this.#width;
    this.#matrix[this.#width * top + left] = value;
  }
  toString(): string {
    let str = "";
    for (let i = 0; i < this.#height; i++) {
      const start = i * this.#height;
      str += this.#matrix.slice(start, start + this.#width).join("") + "\n";
        // this.#matrix.slice(start, start + this.#width).join("").replaceAll(
        //   "0",
        //   "️🙂",
        // )
        //   .replaceAll("1", "🥺") + "\n";
    }
    return str;
  }
}
let state = new Matrix({
  height: HEIGHT,
  width: WIDTH,
});
let nextState = new Matrix({
  height: HEIGHT,
  width: WIDTH,
});

export function init(state: Matrix) {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      state.set(i, j, Math.round(Math.random()));
    }
  }
}

function tick() {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const nw = state.get(i - 1, j - 1);
      const n = state.get(i - 1, j);
      const ne = state.get(i - 1, j + 1);
      const w = state.get(i, j - 1);
      const c = state.get(i, j);
      const e = state.get(i, j + 1);
      const sw = state.get(i + 1, j - 1);
      const s = state.get(i + 1, j);
      const se = state.get(i + 1, j + 1);
      const neighborSum = nw + n + ne + w + e + sw + s + se;
      if (c === 0 && neighborSum === 3) {
        nextState.set(i, j, 1);
      } else if (c === 1 && [2, 3].includes(neighborSum)) {
        nextState.set(i, j, 1);
      } else {
        nextState.set(i, j, 0);
      }
    }
  }
  [state, nextState] = [nextState, state];
}
init(state);
setInterval(() => {
  tick();
  console.log(state.toString());
}, 125);