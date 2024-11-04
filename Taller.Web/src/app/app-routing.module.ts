import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientInfoComponent } from './components/client/client-info/client-info.component';
import { clientDataResolver } from './resolvers/client-list.resolver';
import { ClientAddComponent } from './components/client/client-add/client-add.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { clientResolver } from './resolvers/client.resolver';

const routes: Routes = [
  {
    path:"clients-list",
    component:ClientListComponent,
    resolve:{clientDataResolver}
  },
  {
    path:"client-info/:id/",
    component: ClientInfoComponent
  },
  {
    path:"client-add",
    component: ClientAddComponent
  },

  {
    path:"client-edit/:id",
    component: ClientEditComponent,
    resolve:{clientResolver}
  }
];

@NgModule({
  //se cargan las rutas
  imports: [RouterModule.forRoot(routes)],
  //exportamos las rutas para que esten disponibles a nivel global de la app
  exports: [RouterModule]
})
export class AppRoutingModule { }
