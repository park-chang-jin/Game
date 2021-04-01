"use strict";

import { GameBulider, Reason } from "./game.js";
import PopUp from "./popup.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();

const game = new GameBulider()
  .gameDuration(5)
  .carrotCount(3)
  .bugCount(3)
  .bulid();

function init() {
  gameFinishBanner.setClickListener(() => {
    game.start();
  });

  game.setStopGameListener((reason) => {
    let message;
    switch (reason) {
      case Reason.cancel:
        message = "REPLAY???";
        sound.playAlert();
        break;
      case Reason.win:
        message = "YOU WON!!!";
        sound.playWin();
        break;
      case Reason.lose:
        message = "YOU LOSTㅠㅠ";
        sound.playBug();
        break;
      default:
        throw new Error("not valid reason");
    }
    gameFinishBanner.showWithText(message);
  });
}

init();
