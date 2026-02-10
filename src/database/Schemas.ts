import {pgEnum, pgTable, uuid, text, timestamp, serial, boolean, integer} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRoleEnum = pgEnum("user_role", ["worker", "client"]);

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password_hash: text().notNull(),
  role: userRoleEnum("user_role").default("client").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const refresh_tokens = pgTable("refresh_tokens", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  token_hash: text().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  expires_at: timestamp("expires_at", { withTimezone: true }),
  revoked: boolean().notNull().default(false),
});

export const professionals = pgTable("professionals", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: text().notNull(),
  specialty: text().notNull(),
  is_active: boolean().notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  professional_id: serial("professional_id")
    .references(() => professionals.id, {
      onDelete: "cascade",
    }).notNull(),
  name: text().notNull(),
  duration_minutes: text().notNull(),
  price: text().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const clients = pgTable("clients", {
  id: uuid().primaryKey().notNull().defaultRandom(),
   professional_id: serial("professional_id")
    .references(() => professionals.id, {
      onDelete: "cascade",
    }).notNull(),
  name: text().notNull(),
  phone: text().notNull(),
  email: text().unique().notNull(),
  no_show_count: integer(),
  total_appointments: integer(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const availabilities = pgTable("availabilities", {
  id: serial("id").primaryKey(),
   professional_id: serial("professional_id")
    .references(() => professionals.id, {
      onDelete: "cascade",
    }).notNull(),
  day_of_week: text().notNull(),
  start_time: text().notNull(),
  end_time: text().notNull(),
});

export const statusOfAppointment = pgEnum("status", [
  "scheduled",
  "confirmed",
  "completed",
  "canceled",
  "no_show",
]);
export const appointment = pgTable("appointment", {
  id: serial("id").primaryKey(),
   professional_id: serial("professional_id")
    .references(() => professionals.id, {
      onDelete: "cascade",
    }).notNull(),
  client_id: uuid("client_id")
    .references(() => clients.id, {
      onDelete: "cascade",
    }).notNull(),
  service_id: serial("service_id")
    .references(() => services.id, {
      onDelete: "cascade",
    }).notNull(),
  date: text().notNull(),
  start_time: text().notNull(),
  end_time: text().notNull(),
  status: statusOfAppointment("status"),
  cancel_reason: text(),
  confirm_at: timestamp("confirm_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});
