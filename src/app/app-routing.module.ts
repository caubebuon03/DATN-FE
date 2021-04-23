import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChitietComponent } from './product/chitiet/chitiet.component';
import { LoginComponent } from './customer/login/login.component';
import { MainComponent } from './main/main.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';

const routes: Routes = [
  // { path: 'home', component: MainComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },


  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },

   {
     path: '',
     component: MainComponent,
   },

   {
     path: 'home',
     component: MainComponent,
   },




];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
