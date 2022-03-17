CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "clientId" INTEGER NOT NULL,
  "cakeId" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  "createdAt" DATE,
  "totalPrice" NUMERIC
);