
import { auth } from "@/lib/auth";
import SingOutButton from "./components/sign-out-button";
import { headers } from "next/headers";

const DashboardPage = async () =>{

   const session = await auth.api.getSession({
    headers: await headers(),
   });
  
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