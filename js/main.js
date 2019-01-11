function load() {
	initPrime();
	initInfo();
	initTool();
	initGame();
	initStats();
	initSettingsSpecific();
	['button', 'input'].forEach((tag) => {
		[].forEach.call(getByTag(tag), (ele) => {
			ele.classList.add('btn')
		})
	});
	insertCodeFromFile({
		'path': '../snippets/header.txt',
		'id': 'header'
	});
}
