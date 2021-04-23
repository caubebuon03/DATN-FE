import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../lib/base-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  menus:any;
  total:any;
  brands:any;

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this._api.get('/api/category/get-category').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    }); 
    this._cart.items.subscribe((res) => {
      this.total = res? res.length:0;
    });
    
    this._api.get('/api/brand/get-brand').takeUntil(this.unsubscribe).subscribe(res => {
      this.brands = res;
      
    }); 
    this._cart.items.subscribe((res) => {
      this.total = res? res.length:0;
    });
  }

}
