var prime = {};
function initPrime() {
  prime.values = {
    'no':  'Not prime',
    'yes': 'Prime',
    'pf':  'P.F.*: '
  };
  prime.bool = (n) => prime.isPrime(n)==prime.values.yes;
  prime.isFactor = (a,b) => a%b==0;
  prime.isPrime = (num) => {
    if(num<2) return prime.values.no;
    for(var i=2; i<(num/3)+1; i++) if(prime.isFactor(num,i)) return prime.values.pf;
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
