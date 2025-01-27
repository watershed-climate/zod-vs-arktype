import { z } from "zod";
import { type } from "arktype";

// Example complex schema - replace with your actual schema
export const userSchemaZod = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  profile: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    age: z.number().int().min(0).max(150),
    preferences: z.array(
      z.object({
        key: z.string(),
        value: z.union([z.string(), z.number(), z.boolean()]),
      }),
    ),
  }),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

const preference = type({
  key: "string",
  value: "string|number|boolean",
});

export const userSchemaArktype = type({
  id: "string",
  email: "string",
  profile: {
    firstName: "string",
    lastName: "string",
    age: "number",
    preferences: preference.array(),
  },
  metadata: "Record<string,unknown>",
  createdAt: "Date",
  "updatedAt?": "Date",
});
