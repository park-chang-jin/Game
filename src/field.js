"use strict";

const CARROT_SIZE = 80;
const MOVE_DURATION = 500;

export default class Field {
  constructor(carrotCount, bugCount, level) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.level = level;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);

    this.x2 = this.fieldRect.width - CARROT_SIZE;
    this.y2 = this.fieldRect.height - CARROT_SIZE;
  }

  setClickListener(onClickItem) {
    this.onClickItem = onClickItem;
  }

  onClick = (e) => {
    const target = e.target;
    this.onClickItem && this.onClickItem(target);
  };

  painted() {
    this.field.innerHTML = ``;
    this._addItem("carrot", this.carrotCount * this.level(), "img/carrot.png");
    this._addItem("bug", this.bugCount * this.level(), "img/bug.png");
    this.move();
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    for (var i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);

      const x = randomNumber(x1, this.x2);
      const y = randomNumber(y1, this.y2);

      item.style.position = "absolute";
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }

  move() {
    console.log("s");
    const bugs = document.querySelectorAll(".bug");
    this.timer = setInterval(() => {
      bugs.forEach((bug) => {
        const x = randomNumber(-50, 50);
        const y = randomNumber(-50, 50);
        bug.style.transition = "all 2000ms ease";

        let newX = parseFloat(bug.style.left);
        newX += x;
        if (newX > 0 && newX < this.x2) {
          bug.style.left = `${newX}px`;
        }

        let newY = parseFloat(bug.style.top);
        newY += y;
        if (newY > 0 && newY < this.y2) {
          bug.style.top = `${newY}px`;
        }
      });
    }, MOVE_DURATION);
  }

  moveStop() {
    clearInterval(this.timer);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
