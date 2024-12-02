import type { FastifyInstance } from 'fastify';
import { getStatusHandler } from '../../../../controllers/v1/status.js';

module.exports = async (fastify: FastifyInstance) => {
	fastify.route({
		method: 'GET',
		url: '/',
		handler: getStatusHandler,
	});
};
