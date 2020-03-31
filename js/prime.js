var prime = {};
function initPrime() {
	prime.values = {
		'no':  'Not prime',
		'yes': 'Prime',
		'pf':  'P.F.*: '
	};
	if(!localStorage.hasOwnProperty('primes')) localStorage.primes='';
	prime.primes = [];
	localStorage.primes.split(',').forEach((s) => {if (s.length) prime.primes.push(parseInt(s))})
	prime.addPrime = (n) => {
		if(prime.primes.indexOf(n)>-1) return;
		prime.primes.push(n);
		localStorage.primes=prime.primes.join(',');
	};
	prime.bool = (n) => prime.isPrime(n)==prime.values.yes;
	prime.isPrime = (n) => {
		if(n<2) return prime.values.no;
		if(prime.primes.indexOf(n)>-1) return prime.values.yes;
		for(var i=2; i<Math.floor(n/i)+1; i++) {
			if(prime.bool(i)) {
				prime.addPrime(i);
				if(n%i==0) return prime.values.pf;
			}
		}
		prime.addPrime(n);
		return prime.values.yes;
	};
	prime.factorize = (num) => {
		var factors = [];
		var sqrt = Math.sqrt(num);
		for (var i=2; i<=sqrt; i++) {
			var factor = [i, 0];
			while (num%i==0) {
				factor[1]++;
				num /= i;
			}
			if (factor[1]>0) factors.push(factor);
		}
		if (num>2) factors.push([num, 1])
		return factors;
	};
	prime.pfToStr = (factors) => {
		var str = '<li>';
		for (var f of factors) if (f) str += `<h2 data-exp="${f[1]}">${f[0]}</h2>`;
		return str + '</li>';
	};
}
