"use strict";
const SPACE_SIZE = 200;
const CYCLE = 500;
const RULE = 121;
let state = Array(SPACE_SIZE).fill(0);
let nextState = Array(SPACE_SIZE).fill(0);
function init() {
    for (let i = 0, len = state.length; i < len; i++) {
        state[i] = Math.round(Math.random());
    }
}
function tick() {
    for (let i = 0; i < SPACE_SIZE; i++) {
        const l = state[i];
        const c = state[(i + 1) % SPACE_SIZE];
        const r = state[(i + 2) % SPACE_SIZE];
        const code = (l << 2) + (c << 1) + r;
        if (RULE >> code & 1) {
            nextState[i] = 1;
        }
        else {
            nextState[i] = 0;
        }
    }
    [state, nextState] = [nextState, state];
}
init();
// state[Math.floor(state.length / 2)] = 1;
for (let i = 0; i < CYCLE; i++) {
    console.log(
    // state.join(""),
    state.map((n) => {
        return n ? "🥺" : "⚪️";
    }).join(""));
    tick();
}
