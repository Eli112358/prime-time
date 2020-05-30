import { Elemental } from '/javascripts/modules/elemental.js';
import { info } from './info.js';
import { prime } from './prime.js';
import { settings } from './settings-body.js';
import { stats } from './stats.js';

class Tool extends Elemental {
	top = '<a href="#" class="top">Top</a><br>';
	constructor() {
		super('tool-', [
			'main',
			'answer',
			'input',
		]);
	}
	check(n) {
		let value = prime.is(n);
		let factors = [[value, '']];
		if (eval(`'${value}'=='${prime.values.pf}'`)) {
			factors = prime.factorize(n);
		} else if (value) {
			stats.primes.push(n);
		}
		this.out(prime.stringify(factors));
		return this.elements.answer.lastElementChild;
	}
	clear(full) {
		this.elements.answer.innerHTML = '';
		stats.clear();
		if (full) {
			this.elements.input.value = '0';
			this.elements.input.focus();
		}
	}
	delta(sign) {
		this.elements.input.value = eval([
			this.elements.input.value,
			sign,
			settings.store.elements.range.value,
		].join(''));
	}
	out(s) {
		this.elements.answer.insertAdjacentHTML('beforeEnd', s);
	}
	range() {
		this.clear(false);
		let start = parseInt(this.elements.input.value);
		let end = parseInt(settings.store.elements.range.value);
		for (var x = start; x < end + start; x++) {
			let n = eval(settings.store.elements.formula.value);
			this.check(n).style.setProperty('--x', `"${n}"`);
			if ((x % 10) == 9) {
				this.out(this.top);
			}
		}
		stats.calculate();
	}
}

const tool = new Tool();
window.checkRange = tool.range.bind(tool);
window.clearForm = tool.clear.bind(tool);
window.delta = tool.delta.bind(tool);

export {
	tool,
};
