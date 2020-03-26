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
	prime.isFactor = (a,b) => a%b==0;
	prime.isPrime = (n) => {
		if(n<2) return prime.values.no;
		var params = {'init': 2, 'len': (n/3)+1, 'usePrimes': false};
		var pLen=prime.primes.length;
		if(pLen>0) if(prime.primes[pLen-1]>params.len) params = {'init': 0, 'len': pLen, 'usePrimes': true};
		for(var i=params.init; i<params.len; i++) {
			if(!params.usePrimes) if(prime.bool(i)) prime.addPrime(i);
			p = params.usePrimes?prime.primes[i]:i;
			if (n!=p) if(prime.isFactor(n,p)) return prime.values.pf;
		}
		prime.addPrime(n);
		return prime.values.yes;
	};
	prime.factorize = (num, factors) => {
		if(num<2) return factors;
		var step = (n, next) => {
			factors[n] |= 0;
			factors[n]++;
			return next();
		};
		if(prime.bool(num)) return step(num, () => factors);
		for(var i=0; i<prime.primes.length; i++) {
			if(prime.isFactor(num,prime.primes[i])) {
				return step(prime.primes[i], () => prime.factorize(num/prime.primes[i], factors));
			}
		}
		return factors;
	};
	prime.pfToStr = (factors) => {
		var str = '<li>';
		for (var i in factors) str += `<h2 data-exp="${factors[i]}">${i}</h2>`;
		return str + '</li>';
	};
}
