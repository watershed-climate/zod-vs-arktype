import { describe, bench } from "vitest";
import { userSchemaZod } from "../schemas/common";

const validUserData = {
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
  metadata: {
    lastLogin: "2024-01-17T00:00:00.000Z",
  },
  createdAt: new Date(),
};

describe("Zod Validation Benchmark", () => {
  bench("Zod Validation", () => {
    userSchemaZod.parse(validUserData);
  });
});
