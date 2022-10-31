class MyNumber {
  constructor(number) {
    this.number = number;
  }

  checkIsNumber() {
    if (typeof +this.number !== "number") {
      throw new Error(
        `${this.number} is not typeof number in filter mathRound`
      );
    }
  }
}

function round(round = 2) {
  this.checkIsNumber();

  this.number = +(+this.number).toFixed(round);
  return this;
}

function changePrise() {
  this.checkIsNumber();

  this.number = (this.number - 1) * 100;
  return this;
}

function getPrice() {
  this.checkIsNumber();

  return `${this.number} $`;
}

function getPercent() {
  this.checkIsNumber();

  return `${this.number} %`;
}

function getNum() {
  this.checkIsNumber();

  return this.number;
}

const math = { round, changePrise, getPrice, getPercent, getNum };

Object.entries(math).forEach(([mathName, mathFilter]) => {
  MyNumber.prototype[mathName] = mathFilter;
});

export const createNumber = number => {
  return new MyNumber(number);
};
