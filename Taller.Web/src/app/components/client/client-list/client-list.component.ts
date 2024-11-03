import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { client } from '../../../interfaces/client';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-client-list',
    templateUrl:'./client-list.component.html',
    styleUrls: ['./client-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit{

    clients!: client[];

    constructor(private clientService: ClientService, private route: ActivatedRoute){}

    ngOnInit(): void {
        
        this.clients = this.route.snapshot.data['clientDataResolver'];

        console.log(`Mis datos de clientes ${this.clients}`)

        
    }
 }
