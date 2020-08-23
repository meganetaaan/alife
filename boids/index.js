"use strict";
class Boid {
    constructor() {
        this.COHESION_FORCE = 0.0008;
        this.SEPARATION_FORCE = 0.4;
        this.ALIGNMENT_FORCE = 0.06;
        this.#count = 30;
        this.#x = [];
        this.#v = [];
    }
    #count;
    #x;
    #v;
    get count() {
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
