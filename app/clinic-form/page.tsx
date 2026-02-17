import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { ClinicForm }  from "./components/form"
 

const ClinicFormPage = () =>{
    return(
        <div>
            <h1>Formulário da Clínica</h1>
    <Dialog open >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Adicionar Clinica</DialogTitle>
            <DialogDescription>
              Adicione uma nova clínica para o seu usuário. 
            </DialogDescription>
          </DialogHeader>
          <ClinicForm />
        </DialogContent>
      </form>
    </Dialog>

        </div>
    )
}
export default ClinicFormPage;