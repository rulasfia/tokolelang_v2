// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { lelangRouter } from "./lelang";
import { kategoriRouter } from "./kategori";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", authRouter)
  .merge("lelang.", lelangRouter)
  .merge("kategori.", kategoriRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
