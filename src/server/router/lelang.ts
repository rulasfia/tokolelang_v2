import {
  productDefaultSelector,
  withCategory,
  withHighestBid,
  withImages,
} from "@server/selector/lelangSelector";
import { newLelangSchema } from "@utils/validation/lelangSchema";
import { z } from "zod";
import { createRouter } from "./context";

export const lelangRouter = createRouter()
  .query("all", {
    resolve: async ({ ctx }) => {
      const products = await ctx.prisma.product.findMany({
        select: {
          ...productDefaultSelector,
          ...withCategory,
          ...withImages,
        },
      });

      return products;
    },
  })
  .query("terbuka", {
    resolve: async ({ ctx }) => {
      const today = new Date();

      const products = await ctx.prisma.product.findMany({
        where: { closingDate: { gte: today } },
        select: {
          ...productDefaultSelector,
          ...withCategory,
          ...withImages,
          ...withHighestBid,
        },
      });

      return products;
    },
  })
  .query("dibuat", {
    resolve: async ({ ctx }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) return null;

      const products = await ctx.prisma.product.findMany({
        where: { userID: userId },
        select: {
          ...productDefaultSelector,
          ...withCategory,
          ...withImages,
          ...withHighestBid,
        },
      });

      return products;
    },
  })
  .mutation("create", {
    input: z.object({
      data: newLelangSchema,
      userId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const newProduct = await ctx.prisma.product.create({
        data: {
          ...input.data,
          openingPrice: Number(input.data.openingPrice),
          userID: input.userId,
        },
        select: {
          ...productDefaultSelector,
          ...withCategory,
          ...withImages,
        },
      });

      return newProduct;
    },
  });
