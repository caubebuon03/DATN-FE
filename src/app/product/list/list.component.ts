import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {
  list: any;
  page: any;
  pageSize: any;
  totalItems:any;
  category_id:any;
  menus:any;
  brands:any;

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.list = [];
    this.page = 1;
    this.pageSize = 9;
    this._route.params.subscribe(params => {
      this.category_id = params['id'];
      this._api.post('/api/product/search', { 
        page: this.page, 
        pageSize: this.pageSize, 
        category_id: this.category_id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });   
        
        this._api.get('/api/category/get-category').takeUntil(this.unsubscribe).subscribe(res => {
          this.menus = res;
          
        }); 

        this._api.get('/api/brand/get-brand').takeUntil(this.unsubscribe).subscribe(res => {
          this.brands = res;
          
        }); 
   });   
  }

  loadPage(page) { 
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.post('/api/product/search', { 
        page: page, 
        pageSize: this.pageSize, 
        category_id: id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res.data;
        this.totalItems = res.totalItems;
        }, err => { });       
   });   
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }

}
