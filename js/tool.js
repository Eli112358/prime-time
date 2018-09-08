var tool;
function initTool() {
  tool = initModule('tool-', ['main', 'input', 'answer']);
  tool.out = (str) => {tool.ele.answer.innerHTML += str};
  tool.info = {
    'pf': {
      'title': 'Tool - P.F.',
      'body': `Prime Factorization (${google('prime factorization')})`
    }
  };
}
function checkNumber(num) {
  var pVal = prime.isPrime(num);
  if(pVal==prime.values.pf) {
    info.create({
      'name': 'pf',
      'func': (code) => {
        pVal = pVal.replace('*', code);
      }
    });
  }
  tool.out(pVal);
  if(pVal==prime.values.no) return;
  if(pVal==prime.values.yes) {
    stats.primes.push(num);
    return;
  }
  var factors = prime.factorize(num, []);
  tool.out(prime.pfToStr(factors));
}
function checkRange() {
  clearForm(false);
  for(var x=0;x<getNumVal(settings.store.ele.range);x++) {
    var num = getNumVal(tool.ele.input) + eval(settings.store.ele.formula.value);
    tool.out(num+': ');
    checkNumber(num);
    tool.out('<br>');
    if(x%10==9) tool.out('<a href="#" class="top">Top</a><br>');
  }
  info.setFunctions(tool.info);
  calcStats();
}
function clearForm(full) {
  tool.ele.answer.innerHTML = '';
  stats.clear();
  if(!full) return;
  tool.ele.input.value = '';
  tool.ele.input.focus();
}
function delta(sign) {
  tool.ele.input.value = eval(tool.ele.input.value+sign+settings.store.ele.range.value);
}
