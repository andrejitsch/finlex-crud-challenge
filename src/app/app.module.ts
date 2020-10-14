
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {FlexModule} from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { EmployeeModalComponent } from './employee-list/employee-modal/employee-modal.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    EmployeeListComponent,
    EmployeeModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    FlexModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [ EmployeeModalComponent, ConfirmationModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
