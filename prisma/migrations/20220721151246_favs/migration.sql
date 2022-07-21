-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favId" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favId" TEXT;

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favId_fkey" FOREIGN KEY ("favId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
