import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { client } from '../../../interfaces/client';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-client-info',
    templateUrl:"./client-info.component.html" ,
    styleUrl: './client-info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientInfoComponent implements OnInit {

    public client!: client;

    constructor( private clientService: ClientService, private route:ActivatedRoute){}

    ngOnInit(): void {
        this.route.paramMap.subscribe({
            next:(routes)=>{
                
                //obtenemos el id de parametros en la ruta
                const id =  routes.get("id");
               if(id !==  null){
                this.clientService.getClient(parseInt(id))
            };

            }
        })
    }
 }
