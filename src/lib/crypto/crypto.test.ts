import { toScryptHash, verifyScriptHash } from './crypto.js';

describe('crypto', () => {
	it('should generate a hash that can be verified', async () => {
		const password = 'auspice2litigant6LUGE';

		const hash = await toScryptHash(password);
		const isVerified = await verifyScriptHash(password, hash);

		expect(isVerified).toBeTruthy();
	});
});
