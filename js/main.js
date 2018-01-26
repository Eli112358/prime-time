function load() {
  initPrime();
  initInfo();
  initTool();
  initGame();
  initStats();
  initSettings();
  ['button', 'input'].forEach((tag) => {
    [].forEach.call(getByTag(tag), (ele) => {
      ele.classList.add('btn')
    })
  });
  insertCodeFromFile('https://eli112358.github.io/donate.txt','downloads');
}
