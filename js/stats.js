import { Elemental, toggleButton } from '/javascripts/modules/elemental.js'
import { IterableObject } from '/javascripts/modules/iterable-object.js';
import { data } from '../info/stats.js';
import { info } from './info.js';
import { settings } from './settings-body.js';

class Stats extends Elemental {
	constructor() {
		super('stats-', ['div', 'toggle']);
		this.clear();
		this.elements.toggle.onclick = this.toggle.bind(this);
		this.info = data;
	}
	calculate() {
		this.count = parseInt(settings.store.elements.range.value);
		this.density = this.primes.length / this.count;
		for (var i = 1; i < this.primes.length; i++) {
			let p = this.primes[i];
			this.gaps.push(p - this.primes[i - 1]);
		}
		let sum = this.min = this.max = this.gaps[0];
		for (var gap of this.gaps) {
			sum += gap;
			this.min = Math.min(this.min, gap);
			this.max = Math.max(this.max, gap);
		}
		this.mean = sum / this.gaps.length;
		this.clear();
		new IterableObject(this.info).forEach(([name, _]) => {
			let prefix = (name.charAt(0) == 'm') ? ' (gap)' : '';
			let callback = (code) => {
				this.elements.div.insertAdjacentHTML('beforeEnd', `<h3>${name}${prefix}${code}: ${this[name]}</h3>`);
			};
			info.create({name, callback});
		}, this);
		info.setFunctions(this.info);

	}
	clear() {
		this.elements.div.classList.add('hidden');
		this.elements.div.innerHTML = '';
		this.elements.toggle.innerHTML = 'show';
		this.gaps = [];
		this.primes = [];
	}
	toggle() {
		toggleButton({
			element: this.elements.toggle,
			property: 'innerHTML',
			values: ['show', 'hide'],
		});
		this.elements.div.classList.toggle('hidden');
	}
}

const stats = new Stats();

export {
	stats,
};
