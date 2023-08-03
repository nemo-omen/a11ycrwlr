async function root(fastify, options): Promise<void> {
  fastify.get('/', async function (request, reply) {
    return { root: true };
  });
}

export default root;