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
import {RouterModule} from '@angular/router';
import { BicService } from './users/service/bic.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    JambatronComponent,
    MoneyTransferComponent,
    MopComponent,
    PopupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    FeesService,
    MopService,
    BicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
