/*
  Warnings:

  - The values [PENDENTE] on the enum `StatusReserva` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusReserva_new" AS ENUM ('CONFIRMADA', 'CANCELADA');
ALTER TABLE "reserva" ALTER COLUMN "status" TYPE "StatusReserva_new" USING ("status"::text::"StatusReserva_new");
ALTER TYPE "StatusReserva" RENAME TO "StatusReserva_old";
ALTER TYPE "StatusReserva_new" RENAME TO "StatusReserva";
DROP TYPE "StatusReserva_old";
COMMIT;
