class Player {
  static get VERSION() {
    return '5.0.2';
  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);

    // var rankResp = new XMLHttpRequest();
    // rankResp.open("GET", "http://rainman.leanpoker.org/rank?cards=" + JSON.stringify(ourBot.hole_cards), true);
    // rankResp.onload = function (){
    //   console.log("THIS IS API RANKING" + rankResp.responseText);
    // }
    //
    // rankResp.send(null);
    // console.log("Sended");

    var handQuality = getHandQuality(ourBot.hole_cards);
    // console.log('HAND QUALITY: ' + handQuality);
    var playersInGame = getPlayersLength(gameState.players);
    if (handQuality >= 61){
      currentBet = ourBot.stack;
      bet(currentBet);
      return;
    }

    var currentM = calcM(gameState, ourBot);
    // console.log('!!!gameState:', gameState);

    var isPostFlop = !!gameState.community_cards.length;
    console.log('!!ISPOSTFLOP!!', isPostFlop);

    // PRE FLOP
    if (!isPostFlop) {
      // nice hand and a lot of money
      if (handQuality >= 48 && (currentM > 9)) {
        if (gameState.current_buy_in == gameState.big_blind) {
          currentBet = gameState.big_blind * 3;
          bet(currentBet);
          return;
        } else if (gameState.current_buy_in > gameState.big_blind) {
          currentBet = gameState.current_buy_in + (gameState.minimum_raise * 4);
          if (currentBet > (0.3 * ourBot.stack)) {
            bet(ourBot.stack);
            return;
          } else {
            bet(currentBet);
            return;
          }
        }

      }

      // nice hand and a small amount of money
      if (handQuality >= 48 && (currentM < 9)) {
        currentBet = ourBot.stack;
        bet(currentBet);
        return;
      }
      if (handQuality > 41 && (currentM <= 5)){
        currentBet = ourBot.stack;
        bet(currentBet);
        return;
      }

      if (handQuality > 35 && (currentM <= 2)){
        currentBet = ourBot.stack;
        bet(currentBet);
        return;
      }

      if ((calcM(gameState, ourBot) <= 2)){
        currentBet = ourBot.stack;
        bet(currentBet);
        return;
      }
    } else {
      // POST FLOP
      var hasPair = getSameCard(gameState.community_cards, ourBot.hole_cards);
      if (hasPair) {
        // if (gameState.current_buy_in == gameState.big_blind) {
          if ((gameState.pot / 2) > (0.3 * ourBot.stack)) {
            bet(ourBot.stack);
            return;
          } else {
            bet(gameState.pot / 2);
            return;
          }
        // } else {

        // }
      }

    }

    currentBet = 0;
    bet(currentBet);
  }

  static showdown(gameState) {
  }
  // Custom methods
}

function getSameCard(comunityCards, ourCards) {
  var hasPair = false;

  ourCards.forEach(function (ourCard) {
    var card = ourCard.rank;
    if (!hasPair) {
      hasPair = comunityCards.some(k => k.rank == ourCard);
    }
  });

  return hasPair;
}

function calcM(gameState, player) {
  var stack = parseInt(player.stack);

  return stack / (1.5 * parseInt(gameState.big_blind));
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
