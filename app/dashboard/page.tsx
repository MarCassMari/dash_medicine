"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const DashboardPage = () =>{

   const session = authClient.useSession();
  
     return(
     
     <div>
    <h1>Dashboard</h1>
     <h1>{session?.data?.user?.email}</h1>
     <h1>{session?.data?.user?.name}</h1>

   <Button onClick={()=>authClient.signOut()}>Sair</Button>
     </div>
   );

};

export default DashboardPage;