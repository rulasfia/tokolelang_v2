import type { Prisma } from "@prisma/client";

export const productDefaultSelector: Prisma.ProductSelect = {
  id: true,
  name: true,
  description: true,
  openingPrice: true,
  closingDate: true,
  location: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

export const withCategory: Prisma.ProductSelect = {
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const withImages: Prisma.ProductSelect = {
  images: {
    select: {
      id: true,
      name: true,
      url: true,
    },
  },
};

export const withHighestBid: Prisma.ProductSelect = {
  offers: {
    take: 1,
    orderBy: {
      price: "desc" as Prisma.SortOrder,
    },
    select: {
      id: true,
      price: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
};

export const withAllBid: Prisma.ProductSelect = {
  offers: {
    select: {
      id: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
};
