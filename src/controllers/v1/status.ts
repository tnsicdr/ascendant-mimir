import type { FastifyReply, FastifyRequest } from 'fastify';

export const getStatusHandler = async (
	_: FastifyRequest,
	res: FastifyReply,
) => {
	res.code(200).send({
		status: 'online',
	});
};
