/*
  Warnings:

  - You are about to drop the column `time_updated` on the `Note` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL,
    "time_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Note_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("author_id", "desc", "id", "is_archived", "time_created", "title") SELECT "author_id", "desc", "id", "is_archived", "time_created", "title" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE UNIQUE INDEX "Note_id_author_id_key" ON "Note"("id", "author_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
