"use server";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createClinic = async (name: string) => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });
      console.log('createClinic session:', session);
      if (!session?.user) throw new Error('Unauthorized');
  
      const [clinic] = await db.insert(clinicsTable).values({ name }).returning();
      console.log('created clinic:', clinic);
  
      await db.insert(usersToClinicsTable).values({
        userId: session.user.id,
        clinicId: clinic.id,
      });
  
      redirect('/dashboard');
    } catch (err) {
      console.error('createClinic error:', err);
      throw err;
    }
  };