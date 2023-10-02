import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const stocksRouter = createTRPCRouter({
  getStocks: publicProcedure.mutation(async ({ ctx }) => {
    // TODO: find a way to fetch stocks from an api
  }),

  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
