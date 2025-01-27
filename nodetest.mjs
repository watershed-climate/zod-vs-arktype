import { type } from "arktype";

const preference = type({
  key: "string",
  value: "string|number|boolean",
});

const userSchemaArktype = type({
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

const result = userSchemaArktype(validUserData);
if (result instanceof type.errors) {
  console.error("ERROR!", result);
} else {
  console.log("Valid user data:", JSON.stringify(result, null, 2));
}
