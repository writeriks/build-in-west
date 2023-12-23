import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserType } from "@prisma/client";

export const userRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(
      z.object({
        userType: z.enum([UserType.AUTH0, UserType.FACEBOOK, UserType.GOOGLE]),
        updated_at: z.string().optional(),
        email: z.string(),
        email_verified: z.boolean(),
        name: z.string(),
        lastname: z.string(),
        picture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user?.email === input.email) {
        // User already exist. Do not save
        return;
      }

      return ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
    }),
  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
