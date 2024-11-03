import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
    selector: 'app-client-add',
    templateUrl:'./client-add.component.html',
    styleUrl: './client-add.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddComponent implements OnInit{ 

    //propiedad donde se crearan todos los campos de los formularios
    public clientForm!: FormGroup;

    constructor(private fb: FormBuilder, private clientService: ClientService){

        //creamos el formulario una vez se inicie el constructor
        this.clientForm =  this.fb.group({
            Nombre:["", [Validators.required]],
            Email:["", [Validators.required]],
            Direccion:["", [Validators.required]],
            Telefono:["",[]]
        })
    }

    ngOnInit(): void {
        
    }

    onSubmit():void{

        if(this.clientForm.valid){
            const clientData = this.clientForm.value;
            console.log(`Esta es la data del formulario ${JSON.stringify(clientData)}`)
            this.clientService.createClient(clientData).subscribe({
                next:(clientCreated)=>{
                    alert("Haz registrado el cliente correctamente");
                },
                error:(err)=>{ alert(`No se ha podido crear el cliente correctamente, lo sentimos, sucedio esto ${JSON.stringify(err)}`);}
            })
        }
    }
}
