const crypto = require('crypto');
const { addHours, isValid } = require('date-fns');

let defaultSecret = ''

function setDefaultSecret(value) {
    defaultSecret = value;
}

function FilestackPolicy({
	expiry = addHours(Date.now(), 24), path, container,
	call = [], secret = defaultSecret,
}) {
    if (typeof secret !== 'string') {
        throw new Error('Invalid secret type. Expecting string.')
    }
    if (secret.length === 0) {
        throw new Error('No secret set while attempting to instantiate new FilestackPolicy object.')
    }
	this.expiry = expiry;
	this.path = path;
	this.container = container;
	this.call = call;
	this.secret = secret;
}

function toHmacSha256(obj, secret) {
	return crypto.createHmac('sha256', secret)
		.update(JSON.stringify(obj))
		.digest('base64');
}

FilestackPolicy.prototype.toJSON = function toJSON() {
	return {
		expiry: this.expiry.valueOf(),
		path: this.path,
		container: this.container,
		call: this.call,
	};
};

FilestackPolicy.prototype.sign = function toJSON() {
	if (!this.expiry || !isValid(this.expiry)) throw new Error('FilestackPolicy: Expiry invalid or unset. Policy generation failed.');
	if (!this.path) throw new Error('FilestackPolicy: Path not set. Policy generation failed.');
	if (!this.container && typeof this.container !== 'string') throw new Error('FilestackPolicy: Container not set. Policy generation failed.');
	if (!this.secret && typeof this.container !== 'string') throw new Error('FilestackPolicy: Secret unset. Policy generation failed.');
	if (!this.call && !Array.isArray(this.call)) throw new Error('FilestackPolicy: Permission set (this.call) Policy generation failed.');
	const hmac = toHmacSha256(this.toJSON(), this.secret);
	return hmac;
};

module.exports = {
	FilestackPolicy,
	setDefaultSecret,
};
