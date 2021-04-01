"use strict";

import Field from "./field.js";
import PopUp from "./popup.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBulider {
  gameDuration(gameDuration) {
    this.gameDuration = gameDuration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  bulid() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.infoLevel = document.querySelector(".info__level");
    this.infoPoint = document.querySelector(".info__point");
    this.infoBtn = document.querySelector(".info__button");
    this.infoTimer = document.querySelector(".info__timer");
    this.infoScore = document.querySelector(".info__score");
    this.infoBtn.addEventListener("click", () => {
      this.init();
    });

    this.started = false;
    this.timer = "";
    this.score = 0;
    this.level = 1;
    this.point = 0;

    this.gameFinishBanner = new PopUp();
    this.gameField = new Field(
      this.carrotCount,
      this.bugCount,
      () => this.level
    );
    this.gameField.setClickListener(this.onClickItem);
  }

  setStopGameListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onClickItem = (target) => {
    if (!this.started) {
      return;
    }
    if (target.className === "carrot") {
      ++this.score;
      this.point += 10;
      this.updateScore();
      this.updatePoint();
      if (this.score === this.carrotCount * this.level) {
        this.win();
      }
      target.remove();
      sound.playCarrot();
    } else if (target.className === "bug") {
      sound.playBug();
      this.lose();
    }
  };

  init() {
    if (this.started) {
      this.stop(Reason.cancel);
    } else {
      this.start();
    }
  }

  stop(reason) {
    this.started = false;
    this.hiddenButton();
    this.stopTimer();
    this.gameField.moveStop();
    this.gameFinishBanner.showUndo();
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }

  start() {
    this.started = true;
    this.paint();
    this.showSotpButton();
    this.showTimerWithScore();
    this.startTimer();
    sound.playBg();
  }

  paint() {
    this.infoLevel.innerText = `LEVEL${this.level}`;
    this.score = 0;
    this.infoScore.innerText = this.carrotCount * this.level;
    this.gameField.painted();
  }

  hiddenButton() {
    this.infoBtn.style.visibility = "hidden";
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  showSotpButton() {
    this.infoBtn.style.visibility = "visible";
    const icon = document.querySelector(".fas");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
  }

  showTimerWithScore() {
    this.infoTimer.style.visibility = "visible";
    this.infoScore.style.visibility = "visible";
  }

  startTimer() {
    let remainTime = this.gameDuration + Math.floor(this.level / 2);
    this.updateTimer(remainTime);
    this.timer = setInterval(() => {
      if (remainTime === 0) {
        clearInterval(this.timer);
        this.carrotCount * this.level === this.score ? this.win() : this.lose();
        return;
      }
      this.updateTimer(--remainTime);
    }, 1000);
  }

  updateTimer(time) {
    const minute = Math.floor(time / 60);
    const seconds = time % 60;
    this.infoTimer.innerText = `${minute}:${seconds}`;
  }

  updateScore() {
    this.infoScore.innerText = this.carrotCount * this.level - this.score;
  }

  updatePoint() {
    this.infoPoint.innerText = `${this.point}점`;
  }

  win() {
    this.stop(Reason.win);
    this.gameFinishBanner.showNextLevel();
    this.level++;
  }

  lose() {
    this.stop(Reason.lose);
    this.gameFinishBanner.showPoint(this.point);
    this.level = 1;
  }

  animation() {}
}
