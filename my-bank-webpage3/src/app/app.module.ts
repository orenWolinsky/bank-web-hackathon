import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FeesService} from "./users/service/fees.service";
import {MopService} from "./users/service/mop.service";
import {DropdownModule} from "ng2-dropdown";
import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './users/navbar-component/navbar-component.component';
import { JambatronComponent } from './users/jambatron/jambatron.component';
import { MoneyTransferComponent } from './users/money-transfer/money-transfer.component';
import { MopComponent } from './users/mop/mop.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PopupComponent } from './popup/popup.component';
import { BicService } from './users/service/bic.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TransferComponent } from './users/transfer/transfer.component';
import { Navbar2Component } from './users/navbar2/navbar2.component';
import { AccountsComponent } from './users/accounts/accounts.component';
import { HomeComponent } from './users/home/home.component';
import { SheepComponent } from './users/sheep/sheep.component';
import { SinginService } from './users/service/singin.service';
// import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    JambatronComponent,
    MoneyTransferComponent,
    MopComponent,
    PopupComponent,
    LoginComponent,
    TransferComponent,
    Navbar2Component,
    AccountsComponent,
    HomeComponent,
    SheepComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    //UsersModule,
  ],
  providers: [
    FeesService,
    MopService,
    BicService,
    SinginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
