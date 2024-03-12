/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Services_name_key" ON "Services"("name");
