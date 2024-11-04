import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientAddComponent } from './components/client/client-add/client-add.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { Requestsnterceptor } from '../interceptors/requests';
import { LoginComponent } from './components/login/login.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientAddComponent,
    ClientListComponent,
    ClientEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //modulo de rutas de nuestros componentes
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [provideHttpClient(
    withInterceptorsFromDi()
  ),
  //REGISTRAMOS todos los interceptores
  {
       //espeficamos que tendremos un servicio provedor que sera un interceptador
       provide: HTTP_INTERCEPTORS,
       //El interceptor que utilizaremos, automaticamente ejecutara la funcion de intercept
       useClass: Requestsnterceptor,
       multi:true // especifica que podremos tener varios interceptores en este caso solo teneemos uno
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
