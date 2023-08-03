async function examples(fastify, options): Promise<void> {
  fastify.get('/', async function (request, reply) {
    return 'Hello!!';
  });
};

export default examples;