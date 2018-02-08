import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppComponent},
            {path: 'login', component: LoginComponent},
        ])
    ],
    exports: [RouterModule]
 })
 export class AppRoutingModule {

 }