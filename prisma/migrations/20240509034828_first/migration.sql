-- CreateTable
CREATE TABLE "users" (
    "code" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "borrowing" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "books" (
    "code" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "stock" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "borrows" (
    "code" SERIAL NOT NULL,
    "userCode" TEXT NOT NULL,
    "bookCode" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "returningDate" TIMESTAMP(3),

    CONSTRAINT "borrows_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "availabilities" (
    "code" SERIAL NOT NULL,
    "bookCode" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilities_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "books_code_key" ON "books"("code");

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_userCode_fkey" FOREIGN KEY ("userCode") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "books"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "books"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
