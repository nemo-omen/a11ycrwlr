import Fastify from 'fastify';
import { join } from 'path';
import autoLoad from '@fastify/autoload';

const fastify = Fastify({
  logger: true
});

// will load all routes under src/routes
fastify.register(autoLoad, {
  dir: join(__dirname, 'routes')
});
// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();