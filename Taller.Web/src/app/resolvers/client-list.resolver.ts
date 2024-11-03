import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ClientService } from '../services/client.service';
import { client } from '../interfaces/client';


export const clientDataResolver: ResolveFn<client[]> = (route, state) => {
  //retornaremos la data que obtuvimos
  
  return inject(ClientService).getClients();
  
};