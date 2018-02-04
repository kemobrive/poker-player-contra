class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    var bet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);

    bet = ourBot.stack;

    bet(bet);
  }

  static showdown(gameState) {
  }
  // Custom methods

  /**
   *
   */

  static getOurPlayer(gameState) {
    var players = gameState.players;
    var we = null;

    players.forEach(players, function (player) {
      if (player.name == 'Contra') {
        we = player;
      }
    });

    return we;
  }

  static getHandQuality(hand) {
    var quality = 0;
    console.log('MY HANJD!!!!!!!!',hand);
    // method body

    return quality;
  }
}

module.exports = Player;
