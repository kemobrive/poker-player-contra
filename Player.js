class Player {
  static get VERSION() {

    return '3.2';

  }

  static betRequest(gameState, bet) {
    var currentBet = gameState.big_blind * 2;
    var ourBot = getOurPlayer(gameState);
    var handQuality = getHandQuality(ourBot.hole_cards);
    // console.log('HAND QUALITY: ' + handQuality);
    var playersInGame = getPlayersLength(gameState.players);


    var currentM = calcM(gameState, ourBot);


    console.log('!!!gameState:', gameState);
    // getApi();
    // If M is good
    //Pre flop or post flop
    if (gameState.community_cards.length == 0) {
      if (currentM > 9) {
        // No actions before us
        if (gameState.current_buy_in == gameState.big_blind) {
          bet(gameState.big_blind * 2);
          return;
        } else if (gameState.current_buy_in < (gameState.big_blind * 4)) {
          var bet1 = gameState.current_buy_in + minimum_raise;
          if (bet1 < (0.2 * ourBot.stack)) {
            bet(bet1);
            return;
          }
        }
      }
      if (handQuality >= 61){
        currentBet = ourBot.stack;
        bet(currentBet);
        return;
      }

      // If shitty M
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


      currentBet = 0;
      bet(currentBet);
    } else {
      //POST FLOP bluff
      if (gameState.current_buy_in == gameState.big_blind) {
        bet(gameState.big_blind);
        return;
      } else if (gameState.current_buy_in < (gameState.big_blind * 4)) {
        var bet1 = gameState.current_buy_in + minimum_raise;
        if (bet1 < (0.2 * ourBot.stack)) {
          bet(bet1);
          return;
        }
      }
    }

    currentBet = 0;
    bet(currentBet);
  }

  static showdown(gameState) {
  }
  // Custom methods
}

function getApi() {
  // if (!http) return;
  // console.log('HTTP: ',http);
//   if (!fetch) return;
//
//   // fetch('http://rainman.leanpoker.org/rank',{
//   //   method: 'GET',
//   //   body: {}
//   // })
//   //   .then(res => res.json())
//   //   .then(json => console.log('!!!JSON:',json));
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
