import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
import { client, createClient } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = "https://localhost:7060/Client/clients"
  constructor(private http: HttpClient) { }

  createClient(clientData: createClient ):Observable<createClient>{
  
    return this.http.post<createClient>(this.url, {...clientData}, );
  }

  //metodo para obtener un cliente, esperamo
  getClient(client_id: number ):Observable<client>{
    return this.http.get<client>(this.url+`${client_id}/`);
  }

  getClients():Observable<client[]>{
    return this.http.get<client[]>(this.url).pipe(
      tap((response)=>{ console.log(`Esto son los datos que nos llegan desde el API ${JSON.stringify(response)}`)})
    );
  }

  updateClient(id:number,clientDataUpdate: client ):Observable<void>{
    return this.http.put<void>(this.url ,{ ...clientDataUpdate});
  }

  deleteClient(client_id: number ):Observable<void>{
    return this.http.delete<void>(this.url+`${client_id}/`);
  }

}
