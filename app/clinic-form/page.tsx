
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import {ClinicForm }from "./components/form";
  

const ClinicFormPage = () =>{
    return(
        <div>
    <Dialog open >
      <form>
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