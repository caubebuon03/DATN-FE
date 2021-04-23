import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChitietComponent } from '../product/chitiet/chitiet.component';
import { ListComponent } from './list/list.component';
import { ListBrandComponent } from './list-brand/list-brand.component';


const routes: Routes = [
  {
    path: 'chitiet/:id',
    component: ChitietComponent,
  },

  {
    path: 'list/:id',
    component: ListComponent,
  },

  {
    path: 'listb/:id',
    component: ListBrandComponent,
  },
];  


@NgModule({
  declarations: [ChitietComponent, ListComponent, ListBrandComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductModule { }
