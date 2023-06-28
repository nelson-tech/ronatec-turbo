import payload from 'payload';
import user from './routes/user.mts';
import { publicProcedure } from './procedures.mts';
import { router } from './procedures.mts';
import { Media, Post, PaginatedDocs } from '../main';
import { z } from 'zod';

/* 
  NOTE:
  Do not use path aliases for type imports else api consumers
  will get incorrect typings.
*/

const mediaValidationSchema = z.object({
  s: z.string().trim().min(3).optional(),
});

export const appRouter = router({
  greeting: publicProcedure.query((opts) => 'Hello world!'),

  media: publicProcedure
    .input(mediaValidationSchema)
    .query(async (opts) => {
      // add implicit types
      const media: PaginatedDocs<Media> = await payload.find({
        collection: 'media',
        where: {
          name: {
            contains: opts.input.s,
          },
        },
        limit: 1000,
      });

      return media;
    }),

  posts: publicProcedure.query(async () => {
    // add implicit types
    const posts: PaginatedDocs<Post> = await payload.find({
      collection: 'posts',
    });

    return posts;
  }),

  user,
});

export type AppRouter = typeof appRouter;