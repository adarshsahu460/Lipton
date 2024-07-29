-- DropForeignKey
ALTER TABLE "AdminOTP" DROP CONSTRAINT "AdminOTP_adminID_fkey";

-- DropForeignKey
ALTER TABLE "MenuItems" DROP CONSTRAINT "MenuItems_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOTP" DROP CONSTRAINT "UserOTP_userId_fkey";

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "MenuItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOTP" ADD CONSTRAINT "UserOTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminOTP" ADD CONSTRAINT "AdminOTP_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
