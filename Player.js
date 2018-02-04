class Player {


  static get VERSION() {
    return '0.1.5';
  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);
    console.log(handQuality);
    var playersInGame = getPlayersLength(gameState.players);
    if (handQuality > 57){
      currentBet = ourBot.stack;
      bet(currentBet);
      return;
    }


    if (handQuality >= 17 && calcM(gameState, ourBot) < 200) {
      currentBet = ourBot.stack;
    } else {
      currentBet = 0;
    }

    bet(currentBet);
  }

  static showdown(gameState) {
  }
  // Custom methods
}

function calcM(gameState, player) {
  var stack = player.stack;

  return stack / (1.5 * gameState.big_blind);
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

  if (maxCard == 0) {
    firstHand = firstHand *2;
  } else {
    lastHand = lastHand *2;
  }

  quality = firstHand + lastHand;

  // IF PAIR
  if (hand[0]['rank'] == hand[1]['rank']) {
    quality = quality + 22;
  }

  if (hand[0]['suit'] == hand[1]['suit']) {
    quality = quality + 2;
  }

  // TODO: REMOVE
  // if (quality > 24) {
  //   return 100;
  // }

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
