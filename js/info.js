var info;
function initInfo() {
	info = initModule('info-', ['main', 'close', 'title', 'body', 'footer']);
	info.target = 'info-target';
	info.model = initModel(info, () => {
		['title', 'body', 'footer'].forEach((n) => {
			info.ele[n].innerHTML = '';
		});
	});
	info.log = (details) => {
		for (var n in details) info.ele[n].innerHTML = details[n];
		info.model.open();
	};
	info.create = (spec) => {
		spec.func(`<sup class="${info.target} ${spec.name}">${spec.inner?spec.inner:'?'}</sup>`);
	};
	info.setOnclick = (ele, details) => {
		ele.onclick = function() {info.log(details[this.classList[0]])};
	};
	info.setFunctions = (details) => {for (var n in details) {
		[].forEach.call(getByClass(info.target+' '+n), (a) => {
			info.setOnclick(a, details);
			a.classList.remove(info.target);
		});
	}};
}
function google(q) {
	return `<a href="https://www.google.com/search?q=${q.replace(' ', '+')}" target="_newtab">Google</a>`;
}
