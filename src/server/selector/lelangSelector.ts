import type { Prisma } from "@prisma/client";

export const productDefaultSelector = {
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

export const withCategory = {
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const withImages = {
  images: {
    select: {
      id: true,
      name: true,
      url: true,
    },
  },
};

export const withHighestBid = {
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

export const withAllBid = {
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
