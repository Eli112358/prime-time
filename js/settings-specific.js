var settings;
function initSettingsSpecific() {
  settings = initSettings({
    'store': ['range', 'formula', 'offset'],
    'toggle': ['mode']
  });
  settings.toggle.setup({
    'ele': settings.ele.toggle.mode,
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
