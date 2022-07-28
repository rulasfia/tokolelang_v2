import { z } from "zod";

export const newLelangSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  openingPrice: z.string().regex(/^[0-9]*$/, "Opening price must be a number"),
  closingDate: z.date(),
  categoryID: z.string(),
});

export type INewLelangSchema = z.infer<typeof newLelangSchema>;
