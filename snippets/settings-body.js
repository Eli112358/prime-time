const body = [
	'Mode: <input type="button" id="settings-toggle-mode" value="Game" class="button"><br/>',
	'Range: <input type="number" id="settings-store-range" value="10">',
	'<div class="settings-section">',
		'Formula: <input type="string" id="settings-store-formula" value="x">',
	'</div>',
	'<div class="settings-section hidden">',
		'Offset: <input type="number" id="settings-store-offset" value="10">',
	'</div>',
].join('');

export {
	body,
};