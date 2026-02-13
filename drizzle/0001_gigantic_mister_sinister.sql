ALTER TABLE "clients" RENAME COLUMN "total_appointments" TO "total_services";--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "no_show_count";