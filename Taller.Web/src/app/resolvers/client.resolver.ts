import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ClientService } from '../services/client.service';
import { client } from '../interfaces/client';


export const clientResolver: ResolveFn<client | undefined> = (route, state) => {
  
    //obtenemos el ID que tengamos en la ruta
    const id = route.paramMap.get("id")
    if(id !== null){

        console.log(`Este es el ID ${id}`);
    
        return inject(ClientService).getClient(parseInt(id));
      
    }
  
    return 
};