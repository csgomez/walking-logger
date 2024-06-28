import { z } from 'zod';

export type WalkingStats = {
  duration: number; // in seconds
  distance: number; // in miles
  calories?: number; // calories burnt
  note?: string;
};

export const statsSchema = z.object({
  duration: z.coerce
    .number()
    .gte(0)
    .max(5 * 60 * 60), // 5 hours in seconds
  distance: z.coerce.number().gte(0).max(5), // 5 miles
  calories: z.coerce.number().gte(0).max(900).optional(), // calories
  note: z.string().optional(),
});
