import { Modal } from '/javascripts/modules/modal.js';
import { Elemental } from '/javascripts/modules/elemental.js';

class InformationPanel extends Elemental {
	target = 'info-target';
	constructor() {
		const elementNames = ['main', 'close', 'title', 'body', 'footer'];
		super('info-', elementNames);
		this.modal = new Modal(this, () => {
			elementNames.slice(2).forEach((item) => {
				this.elements[item].innerHTML = '';
			});
		});
	}
	create({
		callback,
		inner=null,
		name,
	}={}) {
		callback(`<sup class="${this.target} ${name}">${inner ? inner : '?'}</sup>`);
	}
	log(details) {
		for (var name in details) {
			this.elements[name].innerHTML = details[name];
		}
		this.modal.open();
	}
	setFunctions(details) {
		for (var name in details) {
			Array.from(document.querySelectorAll(`.${this.target} ${name}`)).forEach((element) => {
				this.setOnclick(element, details);
				element.classList.remove(this.target);
			});
		}
	}
	setOnclick(element, details) {
		element.onclick = (event) => {
			this.log(details[event.target.classList[0]]);
		};
	}
}

const info = new InformationPanel();

export {
	info,
};
