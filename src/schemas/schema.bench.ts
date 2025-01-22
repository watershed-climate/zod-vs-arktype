import { describe, bench } from 'vitest';
import { userSchemaZod, userSchemaArktype } from '../schemas/common';

const validUserData = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "test@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    preferences: [
      { key: "theme", value: "dark" },
      { key: "notifications", value: true }
    ]
  },
  metadata: {
    lastLogin: "2024-01-17T00:00:00.000Z"
  },
  createdAt: new Date(),
};

const invalidUserData = {
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

describe('Schema Validation Benchmarks', () => {
  bench('Zod Validation (Valid)', () => {
    userSchemaZod["~standard"].validate(validUserData);
  }, { iterations: 1_000});

  bench('Arktype Validation (Valid)', () => {
    userSchemaArktype["~standard"].validate(validUserData);
  }, { iterations: 1_000});

  bench('Zod Validation (Invalid)', () => {
    userSchemaZod["~standard"].validate(invalidUserData);
  }, { iterations: 1_000});

  bench('Arktype Validation (Invalid)', () => {
    userSchemaArktype["~standard"].validate(invalidUserData);
  }, { iterations: 1_000});
});