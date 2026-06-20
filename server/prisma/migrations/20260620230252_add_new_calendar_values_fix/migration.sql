/*
  Warnings:

  - You are about to drop the column `length` on the `CalendarReminder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CalendarReminder" DROP COLUMN "length",
ADD COLUMN     "duration" INTEGER;
