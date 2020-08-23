type Vector3 = [number, number, number];
class Boid {
  COHESION_FORCE = 0.0008;
  SEPARATION_FORCE = 0.4;
  ALIGNMENT_FORCE = 0.06;
  #count: number;
  #x: Vector3[];
  #v: Vector3[];
  constructor() {
    this.#count = 30;
    this.#x = [];
    this.#v = [];
  }

  get count(): number {
    return this.#count;
  }

  update() {
    for (let i = 0; i < this.#count; i++) {
      const x_this = this.#x[i];
      const v_this = this.#v[i];

      // const distances = calcNorm(x_that, x_this);
    }
  }
}