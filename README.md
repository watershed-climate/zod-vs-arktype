# zod-vs-arktype

This project compares schema validation performance and correctness between [Zod](https://github.com/colinhacks/zod) and [ArkType](https://github.com/arktypeio/arktype).

## Project Structure

- **src/schemas/common.ts**: Contains the schema definitions for both Zod and ArkType.
- **src/schemas/schema.bench.ts**: Contains benchmark tests to compare the performance of Zod and ArkType.
- **src/schemas/schema.test.ts**: Contains unit tests to validate the correctness of the schemas using Zod and ArkType.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

```sh
git clone git@github.com:watershed-climate/zod-vs-arktype.git
cd zod-vs-arktype
```

2. Install dependencies:

```sh
npm install
```

### Running Tests

To run the unit tests:

```sh
npm test
```

To run the benchmark tests:

```sh
npm run bench
```

To perform a type check:

```sh
npm run typecheck
```