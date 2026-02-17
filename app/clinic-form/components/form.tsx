"use client";
import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";


const clinicFormSchema = z.object({
    name: z.string().trim().min(1,{message: "O nome obrigatório."})
    });

const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
try{

await createClinic(data.name);
toast.success("Clínica criada com sucesso");

}catch(error){
  console.error(error);
  toast.error("Erro ao criar clínica");

}
}

  
export const ClinicForm = () =>{
    
    const form = useForm<z.infer<typeof clinicFormSchema>>({
        resolver: zodResolver(clinicFormSchema),
        defaultValues:{
            name: "",
        }
      });

return(
    <div className="space-y-8">
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField control={form.control} name="name" render={({field}) => (
      <FormItem>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <Input {...field} />
          </FormControl>
      </FormItem>
    )} />
  </form>
</Form>

<DialogFooter>
  <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting &&(
    <Loader2 className="w-4 h-4 animate-spin" />
  )} Criar Clínica</Button>
</DialogFooter>
    </div>
)
}