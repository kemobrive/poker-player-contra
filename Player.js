class Player {


  static get VERSION() {
    return '0.1.3';
  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);
    console.log(handQuality);
    var playersInGame = getPlayersLength(gameState.players);
    if (handQuality == 100){
      currentBet = ourBot.stack;
      bet(currentBet);
      return;
    }


    if (handQuality >= 17 && calcM(gameState, ourBot)<200) {
      currentBet = ourBot.stack;
    } else {
      currentBet = 0;
    }

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

function getPlayersLength(players) {
  var len = 0;
  players.forEach(function (player) {
    if (player.status == 'active') {
      len++;
    }
  });

  return len;

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

  var firstHand = getCardQuality(hand[0]);
  var lastHand = getCardQuality(hand[1]);

  quality = firstHand + lastHand;

  return quality;
}

function getCardQuality(card) {
  var qualityMap = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 15,
  };

  var quality = qualityMap[card.rank] ? qualityMap[card.rank] : card.rank;

  return parseInt(quality);
}

module.exports = Player;
