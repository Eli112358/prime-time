function load() {
	initPrime();
	initInfo();
	initTool();
	initGame();
	initStats();
	initSettingsSpecific();
	loadSnippets({
		'id': 'header',
		'postAppend': () => {
			['button', 'input'].forEach((tag) => {
				[].forEach.call(getByTag(tag), (ele) => {
					ele.classList.add('btn')
				})
			})
		}
	});
}
