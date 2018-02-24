const tape = require('tape');
const { differenceInHours } = require('date-fns');
// TODO: Drop date-fns in favour of tiny function (I don't think there's tree shaking)
const config = require('../../config');
const { FilestackPolicy } = require('./policy');

tape.test('FilestackPolicy defaults', (t) => {
	const policy = new FilestackPolicy({
		path: '/test',
		secret: 'abc',
	});
	const policyJSON = policy.toJSON();
	t.assert(typeof policyJSON === 'object', 'filstackpolicy.toJSON() returns an object.');
	const expDiff = differenceInHours(new Date(policyJSON.expiry), new Date());
	t.assert(expDiff === 24 || expDiff === 23, 'Default expiry time 24 hours from creation time.');
	t.assert(typeof policyJSON.container === 'string' &&
		policyJSON.container.length &&
		policyJSON.container === config.mediaBucket, 'Container is a non-zero length string and equal to the media bucket defined in config.');
	t.end();
});

tape.test('Explicity set FilestackPolicy', (t) => {
	const expiry = new Date();
	const policy = new FilestackPolicy({
		path: '/test',
		secret: 'abc',
		expiry,
	});
	const policyJSON = policy.toJSON();
	t.assert(new Date(policyJSON.expiry), expiry, 'Policy date is equal to set date.');
	t.end();
});
