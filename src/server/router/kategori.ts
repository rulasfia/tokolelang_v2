import { createRouter } from "./context";
import { z } from "zod";
import { newLelangSchema } from "@utils/validation/lelangSchema";
import { newKategoriSchema } from "@utils/validation/kategoriSchema";

const categoryDefaultSelector = {
  id: true,
  name: true,
  description: true,
};

const categorySelectorWithProducts = {
  ...categoryDefaultSelector,
  products: {
    select: {
      id: true,
      name: true,
      openingPrice: true,
    },
  },
};

export const kategoriRouter = createRouter()
  .query("all", {
    resolve: async ({ ctx }) => {
      const categories = await ctx.prisma.category.findMany({
        select: categoryDefaultSelector,
      });

      return categories;
    },
  })
  .mutation("create", {
    input: newKategoriSchema,
    resolve: async ({ ctx, input }) => {
      const newCategory = await ctx.prisma.category.create({
        data: input,
        select: categoryDefaultSelector,
      });

      return newCategory;
    },
  });
