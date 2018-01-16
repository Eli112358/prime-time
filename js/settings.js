var settings;
function initSettings() {
  var colors = ['red', 'green', 'blue'];
  settings = initModule('settings-', ['main', 'open', 'close', 'range', 'mode', 'formula', 'offset']);
  settings.color = initModule('settings-color-', colors);
  settings.store = initModule('settings-store-', ['formula', 'range', 'offset']);
  settings.save = (ele) => {storage.setItem(ele.id, ele.value)};
  settings.load = (ele) => {if(storage.getItem(ele.id)) ele.value = storage.getItem(ele.id)};
  settings.forEach = (func) => {
    ['color', 'store'].forEach((n) => {
      settings[n].ele.forEach(func)
    })
  };
  settings.color.set = (n, val) => {
    document.documentElement.style.setProperty(`--${n}`, val)
  };
  settings.model = initModel(settings, () => {settings.forEach(settings.save)});
  settings.forEach(settings.load)
  colors.forEach((n) => {
    settings.color.set(n, settings.color.ele[n].value);
    settings.color.ele[n].addEventListener('change', function() {
      settings.color.set(n, this.value)
    });
  });
  var setupButton = (name, values, func) => {
    settings.ele[name].onclick = () => {
      toggleButton(settings.ele[name], 'value', name, values);
      func();
    };
    if(parseBool(storage.getItem(name))) {
      func();
      settings.ele[name].value = values[0];
    }
    else storage.setItem(name, 'false');
  };
  setupButton('mode', ['Game', 'Tool'], () => {
    ['mode-main', 'settings-section'].forEach((n) => {
      [].forEach.call(getByClass(n), toggle);
    });
  });
}
