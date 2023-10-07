/*
  Warnings:

  - Added the required column `messageuser` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheduling" ADD COLUMN     "messageuser" TEXT NOT NULL;
