import { randomBytes, scrypt } from 'node:crypto';

/**
 * Takes a string and transforms it into a scypted hash
 *
 * @param {string} value - Input string to hash
 * @returns {Promise<string>} Hashed string with the salt prefixed
 */
export async function toScryptHash(value: string) {
	return new Promise<string>((resolve, reject) => {
		const salt = randomBytes(16).toString('hex');

		scrypt(value, salt, 64, (err, hashedValue) => {
			if (err) reject(err);

			resolve(`${salt}:
        ${hashedValue.toString('hex')}`);
		});
	});
}

/**
 * Compares an input string to a hashed value
 *
 * @param {string} value - Input string to compare to the hash
 * @param {string} hash - Hash to compare to the Input string
 * @returns {Promise<boolean>} Whether the input matches the hashed value
 */
export async function verifyScriptHash(value: string, hash: string) {
	return new Promise<boolean>((resolve, reject) => {
		const [salt, key] = hash.split(':');

		scrypt(value, salt, 64, (err, hashedValue) => {
			if (err) reject(err);

			const isMatch = key.trim() === hashedValue.toString('hex');
			resolve(isMatch);
		});
	});
}
