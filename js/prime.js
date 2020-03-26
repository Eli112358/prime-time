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
		if(prime.primes.indexOf(n)>-1) return prime.values.yes;
		for(var i=2; i<Math.floor(n/i)+1; i++) {
			if(prime.bool(i)) {
				prime.addPrime(i);
				if(prime.isFactor(n,i)) return prime.values.pf;
			}
		}
		prime.addPrime(n);
		return prime.values.yes;
	};
	prime.factorize = (num, factors) => {
		if(num<2) return factors;
		if(prime.bool(num)) {
			factors[num] |= 0;
			factors[num]++;
			return factors;
		}
		var remain = num*1;
		var p = (i) => prime.primes[i];
		for (var i=0; i<Math.floor(remain/p(i)) || remain > 1; i++) {
			if(prime.isFactor(remain,p(i))) factors[p(i)] |= 0;
			while (prime.isFactor(remain,p(i)) && remain > 1) {
				factors[p(i)]++;
				remain /= p(i);
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
