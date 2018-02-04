class Player {


  static get VERSION() {
    return '0.1.4';
  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);
    console.log(handQuality);
    var playersInGame = getPlayersLength(gameState.players);

    if (playersInGame !== 2) {
      currentBet = 0;
    } else {
      currentBet = ourBot.stack;
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
  var maxCard = (firstHand > lastHand) ? 0 : 1;

  quality = firstHand + lastHand;

  if (quality > 24) {
    return 100;
  }

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
