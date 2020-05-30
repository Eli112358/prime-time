import { fixButtons } from '/javascripts/modules/header.js';
import { Settings } from '/javascripts/modules/settings.js';
import { appendHtml } from '/javascripts/modules/snippet.js';
import { body } from '../snippets/settings-body.js';

const store = [
	'range',
	'formula',
	'offset',
];
const toggle = [
	'mode',
];

class PrimeTimeSettings extends Settings {
	constructor() {
		super(
			{
				store,
				toggle,
			},
			{
				body,
			},
		);
		fixButtons('select');
		this.setupToggle(new PrimeTimeToggle(this));
	}
}

class PrimeTimeToggle {
	classList = [
		'mode-main',
		'settings-section',
	];
	property = 'value';
	stored = true;
	values = [
		'Game',
		'Tool',
	];
	constructor(thisValue) {
		this.this = thisValue;
	}
	callback() {
		this.classList.forEach((item) => {
			Array.from(document.querySelectorAll(`.${item}`)).forEach((item0) => {
				item0.classList.toggle('hidden');
			});
		});
	}
	get element() {
		return this.this.toggle.elements.mode;
	}
}

const settings = new PrimeTimeSettings();

export {
	settings,
};
