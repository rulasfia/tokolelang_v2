import { createRouter } from "./context";
import { z } from "zod";
import { newLelangSchema } from "@utils/validation/lelangSchema";

const productDefaultSelector = {
  id: true,
  name: true,
  description: true,
  openingPrice: true,
  closingDate: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

const productSelectorWithCategory = {
  ...productDefaultSelector,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const lelangRouter = createRouter()
  .query("all", {
    resolve: async ({ ctx }) => {
      const products = await ctx.prisma.product.findMany({
        select: productSelectorWithCategory,
      });

      return products;
    },
  })
  .query("terbuka", {
    resolve: async ({ ctx }) => {
      const today = new Date();

      const products = await ctx.prisma.product.findMany({
        where: { closingDate: { gte: today } },
        select: productSelectorWithCategory,
      });

      return products;
    },
  })
  .query("dibuat", {
    resolve: async ({ ctx }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) return null;

      const products = await ctx.prisma.product.findMany({
        where: { userId },
        select: productSelectorWithCategory,
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
          userId: input.userId,
        },
        select: productSelectorWithCategory,
      });

      return newProduct;
    },
  });
