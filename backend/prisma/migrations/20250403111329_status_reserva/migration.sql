/*
  Warnings:

  - You are about to drop the column `date` on the `reserva` table. All the data in the column will be lost.
  - Added the required column `data_reserva` to the `reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusReserva" AS ENUM ('PENDENTE', 'CONFIRMADA', 'CANCELADA');

-- AlterTable
ALTER TABLE "reserva" DROP COLUMN "date",
ADD COLUMN     "data_reserva" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "StatusReserva" NOT NULL;
