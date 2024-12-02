import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// biome-ignore lint/style/noNonNullAssertion: env loading
const db = drizzle(process.env.DB_FILENAME!);
const fastify = Fastify({ logger: true });

fastify.register(AutoLoad, {
	dir: path.join(__dirname, 'plugins'),
});

fastify.register(AutoLoad, {
	dir: path.join(__dirname, 'routes'),
});

fastify.listen({ port: process.env.PORT as unknown as number }).catch((err) => {
	fastify.log.error(err);
	process.exit(1);
});
