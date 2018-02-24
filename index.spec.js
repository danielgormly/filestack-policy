const tape = require('tape');
const { differenceInHours } = require('date-fns');
// TODO: Drop date-fns in favour of tiny function (I don't think there's tree shaking)
const { FilestackPolicy } = require('.');

tape.test('FilestackPolicy defaults', (t) => {
	const policy = new FilestackPolicy({
		path: '/test',
		secret: 'abc',
	});
	const policyJSON = policy.toJSON();
	t.assert(typeof policyJSON === 'object', 'filstackpolicy.toJSON() returns an object.');
	const expDiff = differenceInHours(new Date(policyJSON.expiry), new Date());
    // TODO clean this test up
    t.assert(expDiff === 24 || expDiff === 23, 'Default expiry time 24 hours from creation time.');
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
