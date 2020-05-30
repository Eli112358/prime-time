import { Modal } from '/javascripts/modules/modal.js';
import { Elemental } from '/javascripts/modules/elemental.js';
import { data } from '../info/game.js';
import { info } from './info.js';
import { prime } from './prime.js';
import { settings } from './settings-body.js';

class EndGame extends Elemental {
	constructor(game) {
		super('end-game-', [
			'main',
			'close',
			'par',
			'score',
		]);
		this.game = game;
		this.modal = new Modal(this, () => {
			this.game.elements.start.onclick();
		});
	}
	go() {
		this.fillFrom(this, Object.keys(this.elements).slice(2));
		this.modal.open();
	}
}

class Game extends Elemental {
	constructor() {
		super('game-', [
			'main',
			'correct',
			'guess',
			'how_to_play',
			'incorrect',
			'pf',
			'pow',
			'score',
			'start',
			'target',
		]);
		this.info = new Elemental('game-info-', [
			'how_to_play',
			'scoring',
			'target',
		]);
		this.info.details = data;
		for (var name in this.info.details) {
			this.info.elements[name].classList.add(name);
			info.setOnclick(this.info.elements[name], this.info.details);
		}
		this.elements.start.onclick = this.start.bind(this);
		this.end = new EndGame(this);
	}
	get range() {
		return parseInt(settings.store.elements.range.value);
	}
	get offset() {
		return parseInt(settings.store.elements.offset.value);
	}
	guess() {
		if (this.target == 1) {
			return this.end.go();
		}
		let [pf, pow] = ['pf', 'pow'].map((k) => parseInt(this.elements[k].value));
		let guess = {pf, pow};
		if (guess.pow < 1) {
			return;
		}
		while (guess.pow) {
			let isFactor = (this.target % guess.pf) == 0;
			let guessed = this.factors[(isFactor?'':'in') + 'correct'];
			let i = 0;
			for (i = 0; guessed[i] && guessed[i][0] != guess.pf; i++) {}
			if (!guessed[i]) {
				guessed[i] = [guess.pf, 0];
			}
			guessed[i][1]++;
			guess.pow--;
			if (isFactor) {
				this.target /= guess.pf;
			} else {
				this.score++;
			}
		}
		this.outFactors(true);
		this.outFactors(false);
		this.score++;
		this.refresh();
		if (this.target == 1) {
			this.end.go();
		}
	}
	refresh() {
		this.fillFrom(this, ['score', 'target']);
		this.elements.pow.value = 1;
	}
	outFactors(correct) {
		let id = `${correct ? '' : 'in'}correct`;
		this.elements[id].innerHTML = prime.stringify(this.factors[id]);
	}
	start() {
		this.factors = {
			correct: [],
			incorrect: [],
		};
		this.score = 0;
		this.target = this.offset + (Date.now() % this.range);
		this.refresh();
		this.par = prime.powerSum(prime.factorize(this.target));
		this.elements.correct.innerHTML = '';
		this.factors.correct = [];
		this.elements.incorrect.innerHTML = '';
		this.factors.incorrect = [];
		let option = (i) => `<option value="${i}">${i}</option>`;
		let primes = prime.upTo(this.range + this.offset);
		this.elements.pf.innerHTML = primes.map(option).join('');
		this.elements.pow.value = 1;
	}
}

const game = new Game();
window.makeGuess = game.guess.bind(game);

export {
	game,
};
