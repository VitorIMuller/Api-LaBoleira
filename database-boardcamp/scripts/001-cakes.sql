CREATE TABLE "cakes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "price" NUMERIC NOT NULL,
  "image" VARCHAR NOT NULL,
  "description" TEXT NOT NULL,
  "flavourId" INTEGER NOT NULL 
);