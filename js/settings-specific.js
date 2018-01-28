var settings = {};
function initSettingsSpecific() {
  initSettings({
    'returnObject': settings,
    'store': ['range', 'formula', 'offset'],
    'toggle': ['mode'],
    'func': () => {
      settings.toggle.setup({
        'ele': settings.toggle.ele.mode,
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
  });
}
