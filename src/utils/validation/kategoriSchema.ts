import { z } from "zod";

export const newKategoriSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

export type INewKategoriSchema = z.infer<typeof newKategoriSchema>;
