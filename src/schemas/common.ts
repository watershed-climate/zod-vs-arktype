import { z } from "zod";
import { z as z4 } from "zod4";
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

export const userSchemaZod4 = z4.object({
	id: z4.uuid(),
	email: z4.email(),
	profile: z4.object({
		firstName: z4.string().min(2),
		lastName: z4.string().min(2),
		age: z4.int().check(z4.gte(0), z4.lte(150)),
		preferences: z4.array(
			z4.object({
				key: z4.string(),
				value: z4.union([z4.string(), z4.number(), z4.boolean()]),
			}),
		),
	}),
	metadata: z4.record(z4.string(), z4.unknown()),
	createdAt: z4.date(),
	updatedAt: z4.date().optional(),
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
