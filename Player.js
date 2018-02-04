class Player {


  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    var bet = gameState.big_blind * 2;

    bet(bet);
  }

  static calcM(gameState, player) {
    var stack = player.stack;

    return stack / (1.5 * gameState.big_blind);
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
