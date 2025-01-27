import { describe, it, expect } from "vitest";
import { type } from "arktype";
import { userSchemaZod, userSchemaArktype } from "../schemas/common";

describe("Schema Validation Tests", () => {
  describe("Valid Data", () => {
    const validData = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "test@example.com",
      profile: {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        preferences: [
          { key: "theme", value: "dark" },
          { key: "notifications", value: true },
        ],
      },
      metadata: {},
      createdAt: new Date(),
    };

    it("should validate with Zod", () => {
      const result = userSchemaZod.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate with Arktype", () => {
      const result = userSchemaArktype(validData);
      expect(result).not.toBeInstanceOf(type.errors);
    });
  });

  describe("Invalid Data", () => {
    const invalidData = {
      id: "not-a-uuid",
      email: "not-an-email",
      profile: {
        firstName: "J", // Too short
        lastName: "D", // Too short
        age: 200, // Too high
        preferences: [
          { key: "theme", value: {} }, // Invalid value type
        ],
      },
      metadata: {},
      createdAt: "not-a-date",
    };

    it("should fail validation with Zod", () => {
      const result = userSchemaZod.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation with Arktype", () => {
      const result = userSchemaArktype(invalidData);
      expect(result).toBeInstanceOf(type.errors);
    });
  });
});
