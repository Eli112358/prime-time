var game;
function initGame() {
  game = initModule('game-', ['main', 'pf', 'pow', 'guess', 'correct', 'incorrect', 'start', 'target', 'score', 'how-to-play']);
  game.info = initModule('game-info-', ['how-to-play', 'scoring', 'target']);
  game.info.details = {
    'how-to-play': {
      'title': 'How to Play',
      'body': 'Once you\'ve started a new game, use the drop-down to select a prime you think is a factor of the target. Then into the text-box, enter how many times you think it is a factor. Next press "Guess" and repeat until the target is one. This is a single player game without winning or losing, just scoring better.'
    },
    'scoring': {
      'title': 'Game - Scoring',
      'body': 'Scoring is like in golf: lower is better. Par is the sum of the powers of the prime factors of the starting target'
    },
    'target': {
      'title': 'Game - Target number',
      'body': 'This is the number you are trying to guess the prime factors of'
    }
  };
  for(var n in game.info.details) {
    game.info.ele[n].classList.add(n);
    info.setOnclick(game.info.ele[n], game.info.details);
  }
  game.refresh = () => {
    ['score', 'target'].forEach((n) => {
      game.ele[n].innerHTML = game[n];
    });
  };
  game.ele.start.onclick = () => {
    game.factors = {};
    game.score = 0;
    var vals = {};
    ['range', 'offset'].forEach((n) => {
      vals[n] = getNumVal(settings.store.ele[n]);
    });
    game.target = vals.offset+Date.now()%vals.range;
    game.refresh();
    var targetPF = prime.factorize(game.target, []);
    game.par = 0;
    for(var i in targetPF) game.par+=targetPF[i];
    ['', 'in'].forEach((n) => {
      game.ele[n+'correct'].innerHTML = '';
      game.factors[n+'correct'] = [];
    });
    game.ele.pf.innerHTML = '';
    for(var x=2; x<vals.range+vals.offset; x++) if(prime.bool(x))
      game.ele.pf.innerHTML += `<option value="${x}">${x}</option>`;
    game.ele.pow.value = 1
  };
  game.end = initModule('end-game-', ['main', 'close', 'score', 'par']);
  game.end.model = initModel(game.end, () => {
    game.ele.start.onclick();
  });
  game.end.go = () => {
    ['score', 'par'].forEach((n) => {
      game.end.ele[n].innerHTML = game[n];
    });
    game.end.model.open();
  };
  info.setFunctions(game.info.details);
}
function makeGuess() {
  if(game.target == 1) return game.end.go();
  var guess = {};
  ['pf', 'pow'].forEach((n) => {guess[n] = getNumVal(game.ele[n])});
  if(guess.pow<1) return;
  while(guess.pow>0) {
    var isAFactor = prime.isFactor(game.target, guess.pf);
    var guessed = game.factors[(isAFactor?'':'in')+'correct'];
    guessed[guess.pf]|=0;
    guessed[guess.pf]++;
    guess.pow--;
    if(isAFactor) game.target /= guess.pf;
    else game.score++;
  }
  ['', 'in'].forEach((n) => {game.ele[n+'correct'].innerHTML = prime.pfToStr(game.factors[n+'correct'])});
  game.score++;
  game.refresh();
  if(game.target == 1) game.end.go();
}
