import LifeGame from "./lifegame.ts";
const lifegame = new LifeGame({
  width: 320,
  height: 240,
});
lifegame.setCell(1, 0, 1)
lifegame.setCell(1, 1, 1)
lifegame.setCell(1, 2, 1)
lifegame.init()
setInterval(() => {
  lifegame.tick();
  lifegame.show();
}, 33);