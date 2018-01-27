var settings;
function initSettings() {
  var colors = ['red', 'green', 'blue'];
  settings = initModule('settings-', ['main', 'open', 'close', 'mode']);
  settings.color = initModule('settings-color-', colors);
  settings.store = initModule('settings-store-', ['formula', 'range', 'offset']);
  settings.save = (ele) => {localStorage[ele.id] = ele.value};
  settings.load = (ele) => {
    var storedValue = localStorage[ele.id];
    if(storedValue) ele.value = storedValue;
  };
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
  var setupButton = (spec) => {
    spec.ele.onclick = () => {
      var specCopy = spec;
      toggleButton(specCopy);
      specCopy.func();
    };
    if(parseBool(localStorage[spec.ele.id])) {
      spec.func();
      spec.ele.value = spec.values[0];
    }
    else localStorage[spec.ele.id] = 'false';
  };
  setupButton({
    'ele': settings.ele.mode,
    'property': 'value',
    'stored': true,
    'values': ['Game', 'Tool'],
    'func': () => {
      ['mode-main', 'settings-section'].forEach((n) => {
        [].forEach.call(getByClass(n), toggle)
      })
    }
  });
}
