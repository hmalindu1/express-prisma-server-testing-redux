-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "thumbsUp" INTEGER NOT NULL DEFAULT 0,
    "wow" INTEGER NOT NULL DEFAULT 0,
    "heart" INTEGER NOT NULL DEFAULT 0,
    "rocket" INTEGER NOT NULL DEFAULT 0,
    "coffee" INTEGER NOT NULL DEFAULT 0,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_postId_key" ON "Reaction"("postId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
