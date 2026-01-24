import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, integer, time, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
});

//Relations - User to Clinics - Intermediary table 
export const usersToClinicsTable = pgTable("users_to_clinics",{

  userId: uuid("user_id").notNull().references(()=> usersTable.id),
  clinicId: uuid("clinic_id").notNull().references(()=> clinicsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});
//end

//Relations - User to clinic
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable),
}));

//Relations user to clinic table relations
export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
  user: one(usersTable,{
  fields: [usersToClinicsTable.userId],
  references: [usersTable.id],
  }),
  clinic: one(clinicsTable,{
    fields: [usersToClinicsTable.clinicId],
    references: [clinicsTable.id],
  }),

}));
//end

export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Relationships - One - Clinic has many doctors, patients, and appointments
export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinics: many(usersToClinicsTable),
}));
//end

export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  //This doctor works in this clinic - foreign key
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url").notNull(),
  spciality: text("spciality").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  // 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: Sunday
  availableFromWeekday: integer("available_from_weekday").notNull(), //1
  availableToWeekday: integer("available_to_weekday").notNull(), // 5
  availableFromTime: time("available_from_time").notNull(),
  availableToTime: time("available_to_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Relationships - One - Doctor works in this clinic
export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id],
  }),
}));
//end

export const patientSexEnum = pgEnum("patients_sex", ["male", "female", "other"]);

export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  //This patient is registered in this clinic - foreign key
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  sex: patientSexEnum("sex").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Relationships  - One - Patient schedule in this clinic

export const patientsTableRelations = relations(patientsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
      fields: [patientsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }));
//end

export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  // Keys for foreign tables
  //This appointment is for this patient - foreign key
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }),
  patientId: uuid("patient_id").references(() => patientsTable.id, { onDelete: "cascade" }).notNull(),
  doctorId: uuid("doctor_id").references(() => doctorsTable.id, { onDelete: "cascade" }).notNull(),
  //Keys for foreign tables - end 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

//Relationships  - Many - Appointments works in this clinic
export const appointmentTableRelations = relations(appointmentsTable,({one}) => ({
  clinic: one(clinicsTable,{
    fields: [appointmentsTable.clinicId],
    references:[clinicsTable.id],
  }),

  patient: one(patientsTable,{
    fields: [appointmentsTable.clinicId],
    references:[patientsTable.id],
  }),

  doctor: one(doctorsTable,{
    fields: [appointmentsTable.clinicId],
    references:[doctorsTable.id],
  }),
}));
//end