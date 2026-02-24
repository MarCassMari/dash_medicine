
import { auth } from "@/lib/auth";
import SingOutButton from "./_components/sign-out-button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";

const DashboardPage = async () =>{

   const session = await auth.api.getSession({
    headers: await headers(),
   });
   if(!session?.user){
     redirect("/authentication");
   }
  //Validar os dados do usuário atual - validando se o user id atual é igual ao user id da tabela. 
  const clinicas = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id)
  });

  if(clinicas.length === 0){
    redirect("/clinic-form");
  }
     return(
     
     <div>
    <h1>Dashboard</h1>
     <h1>{session?.user?.email}</h1>
     <h1>{session?.user?.name}</h1>

   <SingOutButton/>
     </div>
   );

};

export default DashboardPage;