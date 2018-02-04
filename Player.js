class Player {


  static get VERSION() {
    return '0.1.1';
  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);

    currentBet = ourBot.stack;

    bet(currentBet);
  }

  static calcM(gameState, player) {
    var stack = player.stack;

    return stack / (1.5 * gameState.big_blind);
  }

  static showdown(gameState) {
  }
  // Custom methods
}


function getOurPlayer(gameState) {
  var players = gameState.players;
  var we = null;

  players.forEach(function (player) {
    if (player.name == 'Contra') {
      we = player;
    }
  });

  return we;
}

function getHandQuality(hand) {
  var quality = 0;
  console.log('MY HANJD!!!!!!!!',hand);
  // method body

  return quality;
}

module.exports = Player;
