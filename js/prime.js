var prime = {};
function initPrime() {
  prime.values = {
    'no':  'Not prime',
    'yes': 'Prime',
    'pf':  'P.F.*: '
  };
  if(!localStorage.hasOwnProperty('primes')) localStorage.primes='';
  prime.primes = localStorage.primes.split(',');
  prime.addPrime = (n) => {
    if(!prime.primes.indexOf(n)==-1) return;
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
      if(prime.isFactor(n,(params.usePrimes?prime.primes[i]:i))) return prime.values.pf;
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
    for(var i=2; i<(num/2)+1; i++) {
      if(prime.bool(i) && prime.isFactor(num,i)) {
        return step(i, () => prime.factorize(num/i, factors));
      }
    }
    return factors;
  };
  prime.pfToStr = (factors) => {
    var str='';
    for(var i in factors) str += `${i}<sup>${factors[i]}</sup>`;
    return str;
  };
}
