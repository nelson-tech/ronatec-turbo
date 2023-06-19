import { protectedProcedure, router } from '../procedures.mts';

export default router({
  self: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
