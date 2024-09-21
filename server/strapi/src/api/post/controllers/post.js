// controllers/post.js

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = { ...ctx.query, populate: 'coverImage' };
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    } catch (error) {
      throw error;
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    // Check if 'id' is numeric
    const isNumericId = /^\d+$/.test(id);

    if (isNumericId) {
      // It's a numeric ID, proceed as usual
      ctx.query = {
        ...ctx.query,
        populate: {
          // @ts-ignore
          content: {
            populate: {
              images: {
                populate: '*',
              },
            },
          },
          coverImage: true,
        },
      };
      return await super.findOne(ctx);
    } else {
      // It's a slug, fetch the post by slug
      try {
        const posts = await strapi.entityService.findMany('api::post.post', {
          filters: { slug: id },
          populate: {
            content: {
              populate: {
                images: {
                  populate: '*',
                },
              },
            },
            coverImage: true,
          },
        });

        if (!posts || posts.length === 0) {
          return ctx.notFound('Post not found');
        }

        const post = posts[0];
        const sanitizedEntity = await this.sanitizeOutput(post, ctx);

        return this.transformResponse(sanitizedEntity);
      } catch (error) {
        ctx.throw(500, error);
      }
    }
  },
}));
