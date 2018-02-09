import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { MopComponent } from '../users/mop/mop.component';
import { TransferComponent } from '../users/transfer/transfer.component';
import { AccountsComponent } from '../users/accounts/accounts.component';
import { HomeComponent } from '../users/home/home.component';
import { SheepComponent } from '../users/sheep/sheep.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: LoginComponent},
            {path: 'transfer', component: TransferComponent}, 
            {path: 'accounts', component: AccountsComponent}, 
            {path: 'home', component: HomeComponent},
            {path: 'sheep', component: SheepComponent},
        ])
    ],
    exports: [RouterModule]
 })
 export class AppRoutingModule {

 }