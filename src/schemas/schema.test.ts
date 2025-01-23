import { describe, it, expect } from 'vitest';
import { userSchemaZod, userSchemaArktype } from '../schemas/common';

describe('Schema Validation Tests', () => {
  describe('Valid Data', () => {
    const validData = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "test@example.com",
      profile: {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        preferences: [
          { key: "theme", value: "dark" }
        ]
      },
      metadata: {},
      createdAt: new Date(),
    };

    it('should validate with Zod', async () => {
      const result = await userSchemaZod["~standard"].validate(validData);
      expect(result.issues).toBeFalsy();
    });

    it('should validate with Arktype', async () => {
      const result = await userSchemaArktype["~standard"].validate(validData);
      expect(result.issues).toBeFalsy();
    });
  });

  describe('Invalid Data', () => {
    const invalidData = {
      id: "not-a-uuid",
      email: "not-an-email",
      profile: {
        firstName: "J", // Too short
        lastName: "D", // Too short
        age: 200, // Too high
        preferences: [
          { key: "theme", value: {} } // Invalid value type
        ]
      },
      metadata: {},
      createdAt: "not-a-date",
    };

    it('should fail validation with Zod', async () => {
      const result = await userSchemaZod["~standard"].validate(invalidData);
      expect(result.issues).toBeTruthy();
    });

    it('should fail validation with Arktype', async () => {
      const result = await userSchemaArktype["~standard"].validate(invalidData);
      expect(result.issues).toBeTruthy();
    });
  });
});