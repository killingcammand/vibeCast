-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "videoID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "videoID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "targetID" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "like_videoID_userID_targetType_targetID_key" ON "like"("videoID", "userID", "targetType", "targetID");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
