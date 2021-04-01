"use Strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".game__popUp");
    this.popUpLevel = document.querySelector(".popUp__level");
    this.popUpPoint = document.querySelector(".popUp__point");
    this.popUpBtn = document.querySelector(".popUp__button");
    this.popUpMessgae = document.querySelector(".popUp__message");
    this.popUpBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hidden();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hidden() {
    this.popUp.classList.add("hidden");
  }

  showWithText(text) {
    this.popUp.classList.remove("hidden");
    this.popUpMessgae.innerText = text;
  }

  showNextLevel() {
    const icon = this.popUpBtn.querySelector(".fas");
    this.popUpLevel.classList.remove("hidden");
    icon.classList.remove("fa-redo");
    icon.classList.add("fa-arrow-right");
  }

  showUndo() {
    const icon = this.popUpBtn.querySelector(".fas");
    this.popUpLevel.classList.add("hidden");
    icon.classList.add("fa-redo");
    icon.classList.remove("fa-arrow-right");
  }

  showPoint(point) {
    this.popUpPoint.classList.remove("hidden");
    this.popUpPoint.innerText = `${point}점`;
  }
}
