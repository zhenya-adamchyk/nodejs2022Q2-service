/*
  Warnings:

  - The `favId` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `favId` column on the `Artist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Favorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `favId` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favId",
ADD COLUMN     "favId" INTEGER;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favId",
ADD COLUMN     "favId" INTEGER;

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favId",
ADD COLUMN     "favId" INTEGER;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
