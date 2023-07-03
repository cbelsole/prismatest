# Prisma Test

## Setup

1. `docker-compose up`
2. `npm i`
3. `npm run prisma:generate`
4. `npm run prisma:migrate`

## Description

This is a test repository for testing decimal values in Prisma with a Postgres data source.

Given the schema:

```prisma
model DecimalTest {
  id           Int     @id @default(autoincrement())
  test_decimal Decimal @db.Decimal
}
```

We can see the test_decimal without precision or scale.

The code here is simple

```ts
const testDecimal = await prisma.decimalTest.create({
  data: { test_decimal: 0.5 },
});
console.log(testDecimal);

// { id: 1, test_decimal: 0.5 }
```

Indeed we get `0.5` back from the database.

Although when we query the database the value which is saved is saved with trailing zeros.

```sql

postgres=# select * from "DecimalTest";
 id |    test_decimal
----+--------------------
  1 | 0.5000000000000000
(1 rows)
```

Why does Prisma insert trailing zeros?

This question came about after doing a Sequelize to Prisma migration. The code that was interacting with Sequelize was retrieving a different result than the code that was interacting with Prisma.

Included in this repo is a docker compose file to run a local postgres server. Start via `docker-compose up`.
