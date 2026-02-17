"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";


const clinicFormSchema = z.object({
    name: z.string().trim().min(1,{message: "O nome obrigatório."})
    });

const onSubmit = (data: z.infer<typeof clinicFormSchema>) => {
    console.log(data);
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
  <Button type="submit">Salvar</Button>
</DialogFooter>
    </div>
)
}