import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterial } from './angular.material';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FooterComponent } from './global/footer/footer.component';
import { HeaderComponent } from './global/header/header.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule,ReactiveFormsModule, AngularMaterial,BrowserAnimationsModule, HttpClientModule
  ],
  declarations: [
    AppComponent, HelloComponent, FooterComponent, HeaderComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
