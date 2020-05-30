import { truStorage } from '/javascripts/modules/TruStorage.es6.min.js';

class PrimeValue {
	constructor(value) {
		this.value = value;
	}
	valueOf() {
		return this.value == 'Prime';
	}
	toString() {
		return this.value;
	}
}

class Prime {
	values = {
		no: new PrimeValue('Not prime'),
		pf: new PrimeValue('factorize'),
		yes: new PrimeValue('Prime'),
	};
	constructor() {
		truStorage.setDefault('primes', []);
		this.primes = new Set(truStorage.getItem('primes'));
	}
	add(n) {
		this.primes.add(n);
		truStorage.setItem('primes', Array.from(this.primes));
	}
	factorize(n) {
		let factors = [];
		let sqrt = Math.sqrt(n);
		for (var i = 2; i <= sqrt; i++) {
			let factor = [i, 0];
			while (n%i == 0) {
				factor[1]++;
				n /= i;
			}
			if (factor[1] > 0) {
				factors.push(factor);
			}
		}
		if (n > 2) {
			factors.push([n, 1]);
		}
		return factors;
	}
	factorMap(f) {
		return `<h2 data-exp="${f[1]}">${f[0]}</h2>`;
	}
	is(n, returnType = 'boolean') {
		if (n < 2) {
			return this.values.no;
		}
		if (n < 4) {
			this.primes.add(n);
		}
		if (this.primes.has(n)) {
			return this.values.yes;
		}
		if (this.powerSum(this.factorize(n)) > 1) {
			return this.values.pf;
		}
		this.add(n);
		return this.values.yes;
	}
	powerSum(factors) {
		return factors.reduce((acc, cur) => acc + cur[1], 0);
	}
	stringify(factors) {
		return `<li>${factors.map(this.factorMap).join('')}</li>`;
	}
	upTo(n, length = n) {
		return Array.from({length}, (_, i) => i).filter((i) => +this.is(i));
	}
}

const prime = new Prime();

export {
	prime,
};
