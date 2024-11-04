import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { client } from '../../../interfaces/client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-client-list',
    templateUrl:'./client-list.component.html',
    styleUrls: ['./client-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit{

    clients!: client[];

    constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(): void {
        
        this.clients = this.route.snapshot.data['clientDataResolver'];

        console.log(`Mis datos de clientes ${this.clients}`)

        
    }

    deleteClient(id:number){

        var clientAnswer = confirm("Estas seguro de eliminar el cliente?")
        if(clientAnswer){
            this.clientService.deleteClient(id).subscribe({
                next:(clientDeleted)=>{
                     alert("Se ha eliminado el cliente correctamente")
                     this.reloadClients();
                },
                error:(err)=>{ alert("No hemos podido eliminar el cliente debido a un error")}
            });
        }
        
        console.log("No se ha eliminado el cliente");
    }


    reloadClients():void{
        const url = this.router.url;
        this.router.navigateByUrl("/", {
            skipLocationChange:true,
          }).then(()=>{
            //esto devuelve una promesa en la cual navegaremos a la url actual en la que estabamos anteriormente  
            this.router.navigate([url]);
          
          });
    }
 }
