class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.log(gameState);

    bet(0);
  }

  static showdown(gameState) {
  }
  // Custom methods

  /**
   *
   */
  static getHandQuality(hand) {
    var quality = 0;

    // method body

    return quality;
  }
}

module.exports = Player;
