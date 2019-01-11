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
	var liWord = (word) => `<li><h2 data-exp="">${word}</h2></li>`;
	var pVal = prime.isPrime(num);
	if(pVal==prime.values.no) {
		tool.out(liWord(pVal));
		return;
	}
	if(pVal==prime.values.yes) {
		stats.primes.push(num);
		tool.out(liWord(pVal));
		return;
	}
	var factors = prime.factorize(num, []);
	tool.out(prime.pfToStr(factors));
}
function checkRange() {
	clearForm(false);
	var x = 0;
	var start = eval(settings.store.ele.formula.value);
	x = 1;
	var increment = eval(settings.store.ele.formula.value) - start;
	document.body.style.setProperty('--start', start - increment);
	document.body.style.setProperty('--increment', increment);
	for(x = 0; x < getNumVal(settings.store.ele.range); x++) {
		var num = getNumVal(tool.ele.input) + eval(settings.store.ele.formula.value);
		checkNumber(num);
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
