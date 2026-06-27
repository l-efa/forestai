/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `TaskTable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskTable_projectId_key" ON "TaskTable"("projectId");
