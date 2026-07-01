/*
  Warnings:

  - Changed the type of `targetID` on the `like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "like" DROP COLUMN "targetID",
ADD COLUMN     "targetID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_videoID_userID_targetType_targetID_key" ON "like"("videoID", "userID", "targetType", "targetID");
