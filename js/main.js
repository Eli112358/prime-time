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
  insertCodeFromFile('path': 'https://eli112358.github.io/snippets/header.txt', 'element': document.getElementById('downloads'), 'func': () => {
    insertCodeFromFile('path': 'https://eli112358.github.io/snippets/donate.txt', 'element': document.getElementById('donate'));
  });
}
