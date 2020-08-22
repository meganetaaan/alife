import {
  assertEquals,
} from "https://deno.land/std@0.60.0/testing/asserts.ts";
import { Matrix } from "./lifegame.ts";

Deno.test({
  name: "1*1",
  fn: () => {
    const matrix = new Matrix({
      height: 1,
      width: 1
    })
    assertEquals(matrix.toString(), '0\n')
  }
})

Deno.test({
  name: "2*2",
  fn: () => {
    const matrix = new Matrix({
      height: 2,
      width: 2
    })
    assertEquals(matrix.toString(), '00\n00\n')
  }
})

Deno.test({
  name: "get",
  fn: () => {
    const matrix = new Matrix({
      height: 2,
      width: 2
    })
    assertEquals(matrix.get(0, 0), 0)
  }
})

Deno.test({
  name: "set",
  fn: () => {
    const matrix = new Matrix({
      height: 2,
      width: 2
    })
    matrix.set(0, 0, 1)
    assertEquals(matrix.get(0, 0), 1)
  }
})