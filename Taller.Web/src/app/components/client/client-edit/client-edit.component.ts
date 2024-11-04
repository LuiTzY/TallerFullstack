import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { client } from '../../../interfaces/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: "./client-edit.component.html",
  styleUrl: './client-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditComponent implements OnInit{ 

  clientEditForm!: FormGroup;
  public clientID!: number;
  public clientInfo!: client;
  constructor(private fb: FormBuilder, private clientService: ClientService, private route: ActivatedRoute, private router: Router){
    this.clientInfo =  this.route.snapshot.data['clientResolver'];

    this.clientEditForm = this.fb.group({
      Nombre:[this.clientInfo.nombre],
      Email:[this.clientInfo.email, [Validators.email]],
      Direccion:[this.clientInfo.direccion],
      Telefono:[this.clientInfo.telefono]
    });
  }

  ngOnInit(): void {

  }

  onSubmit():void{
    if(this.clientEditForm.valid){
      const data = this.clientEditForm.value;

      this.clientService.updateClient(this.clientInfo.clienteId,data).subscribe({
        next:(response)=>{
          alert("Se ha editado el cliente correctamente");
          this.router.navigate(["/clients-list"])
        },
        error:(err)=>{
          alert("No hemos podido crear el cliente correctamente");
        }
      })

    }
  }


}
