-- AlterTable
CREATE SEQUENCE "user_version_seq";
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT nextval('user_version_seq'),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
ALTER SEQUENCE "user_version_seq" OWNED BY "User"."version";
