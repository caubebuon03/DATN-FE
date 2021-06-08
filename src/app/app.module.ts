import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './customer/cart/cart.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { ChitietComponent } from './product/chitiet/chitiet.component';
import { ListComponent } from './product/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimKiemComponent } from './tim-kiem/tim-kiem.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TimKiemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
