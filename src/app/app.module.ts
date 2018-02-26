import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes}from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
//firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CategoriasComponent } from './categorias/categorias.component';

export const appRoutes:Routes = [
  {path: "", component:InicioComponent} ,
{path: "carrito", component:CarritoComponent},
{path: "categorias", component:CarritoComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CarritoComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'webcomercio')

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
