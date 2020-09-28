class Gandalf {
  constructor() {
    this.status = undefined;
    this.message = undefined;
  }

  static isGandalf(instance) {
    return instance instanceof Gandalf;
  }
}

module.exports = Gandalf;
