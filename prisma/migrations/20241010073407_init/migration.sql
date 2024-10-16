-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL,
    "time_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_updated" DATETIME NOT NULL,
    CONSTRAINT "Note_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "time_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_remind" DATETIME NOT NULL,
    CONSTRAINT "Reminder_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_author_id_key" ON "Note"("id", "author_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_id_author_id_key" ON "Reminder"("id", "author_id");
