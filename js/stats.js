var stats;
function initStats() {
  stats = initModule('stats-', ['div', 'toggle']);
  stats.ele.toggle.onclick = () => {
    toggleButton({
      'ele': stats.ele.toggle,
      'property': 'innerHTML',
      'stored': false,
      'values': ['show', 'hide']
    });
    toggle(stats.ele.div);
  };
  stats.clear = () => {
    hide(stats.ele.div);
    stats.ele.div.innerHTML = '';
    stats.ele.toggle.innerHTML = 'show';
    ['primes', 'gaps'].forEach((n) => {stats[n] = []});
  };
  stats.info = {
    'count': {
      'title': 'Stats - count',
      'body': 'Ammount of prime numbers in range'
    },
    'density': {
      'title': 'Stats - density',
      'body': 'Amount of prime numbers divided by the range'
    },
    'min': {
      'title': 'Stats - min',
      'body': 'Shortest gap between prime numbers'
    },
    'max': {
      'title': 'Stats - max',
      'body': 'Longest gap between prime numbers'
    },
    'mean': {
      'title': 'Stats - mean',
      'body': 'Average length of gaps between the prime numbers'
    }
  };
  stats.clear();
}
function calcStats() {
  stats.count = stats.primes.length;
  stats.density = stats.count/getNumVal(settings.store.ele.range);
  for(var x=1;x<stats.count;x++) ((p) => {
    stats.gaps.push(p-stats.primes[x-1]);
  }) (stats.primes[x]);
  stats.gapCount = stats.gaps.length;
  var sum = stats.gaps[0];
  var mm = ['min', 'max'];
  mm.forEach((m) => {stats[m] = stats.gaps[0]});
  for(var x=1;x<stats.gapCount;x++) {
    sum += stats.gaps[x];
    ['min', 'max'].forEach((n) => {
      stats[n] = Math[n](stats[n], stats.gaps[x]);
    });
  }
  stats.mean = sum/stats.gapCount;
  stats.clear();
  ['count', 'density', 'min', 'max', 'mean'].forEach((n) => {
    var gap = n.substr(0,1)=='m'?' (gap)':'';
    info.create({
      'name': n,
      'func': (code) => {
        stats.ele.div.innerHTML += `<h3>${n}${gap}${code}: ${stats[n]}</h3>`;
      }
    });
  });
  info.setFunctions(stats.info);
}
