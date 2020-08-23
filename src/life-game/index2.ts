const HEIGHT = 64;
const WIDTH = 256;

type Cell = number;
type Cells = Set<Cell>;

function calcTop(cell: Cell): number {
  return cell >> 8;
}
function calcLeft(cell: Cell): number {
  return cell & 0xff;
}
function cell(top: number, left: number) {
  return (top << 8) | left;
}

function countNeighbors(c: Cell, cs: Cells): number {
  const t = calcTop(c)
  const st = t === 0 ? HEIGHT - 1 : t - 1
  const gt = t === HEIGHT - 1 ? 0 : t + 1
  const l = calcLeft(c)
  const sl = l === 0 ? WIDTH - 1 : l - 1
  const gl = l === WIDTH - 1 ? 0 : l + 1
  const count =
    Number(cs.has(cell(st, sl))) +
    Number(cs.has(cell(t, sl))) +
    Number(cs.has(cell(gt, sl))) +
    Number(cs.has(cell(st, l))) +
    Number(cs.has(cell(gt, l))) +
    Number(cs.has(cell(st, gl))) +
    Number(cs.has(cell(t, gl))) +
    Number(cs.has(cell(gt, gl)))
  return count
}

function survive(c: Cell, cs: Cells): boolean {
  const nadj = countNeighbors(c, cs)
  return nadj === 3 || (cs.has(c) && nadj === 2);
}

function addNeighbors(c: Cell, cs: Cells): void {
  const t = calcTop(c);
  const st = t === 0 ? HEIGHT - 1 : t - 1;
  const gt = t === HEIGHT - 1 ? 0 : t + 1;
  const l = calcLeft(c);
  const sl = l === 0 ? WIDTH - 1 : l - 1;
  const gl = l === WIDTH - 1 ? 0 : l + 1;
  cs.add(cell(st, sl));
  cs.add(cell(t, sl));
  cs.add(cell(gt, sl));
  cs.add(cell(st, l));
  cs.add(cell(gt, l));
  cs.add(cell(st, gl));
  cs.add(cell(t, gl));
  cs.add(cell(gt, gl));
}

function includeNeighbors(cs: Cells, result: Cells): Cells {
  for (const cell of Array.from(cs)) {
    addNeighbors(cell, result)
  }
  return result;
}

class LifeGame {
  cells: Cells = new Set();
  nextCells: Cells = new Set();
  #arr: Uint8Array = new Uint8Array(WIDTH * HEIGHT)
  init() {
    const cs = this.cells
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        if (Math.random() > 0.5) {
          cs.add(cell(i, j))
        }
      }
    }
  }
  tick() {
    this.nextCells.clear()
    this.nextCells = includeNeighbors(this.cells, this.nextCells);
    for (const cell of this.nextCells) {
      if (!survive(cell, this.cells)) {
        this.nextCells.delete(cell);
      }
    }
    [this.cells, this.nextCells] = [this.nextCells, this.cells]
  }
  show() {
    const arr = this.#arr
    arr.fill(0)
    for (let cell of this.cells) {
      const idx = calcTop(cell) * WIDTH + calcLeft(cell)
      arr[idx] = 1
    }
    const rows = []
    for (let i = 0; i < HEIGHT; i++) {
      const start = i * WIDTH
      rows.push(arr.slice(start, start + WIDTH - 1).join(''))
    }
    console.log(rows.join('\n'))
  }
}

const lifegame = new LifeGame()
lifegame.init()
let count = 0
setInterval(() => {
  lifegame.tick()
  // console.log(count++)
  lifegame.show()
}, 33)
