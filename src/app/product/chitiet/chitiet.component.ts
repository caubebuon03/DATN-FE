import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../lib/base-component';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent extends BaseComponent implements OnInit {
  item:any;
  tuongtu:any;
  menus:any;
  brands:any;

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.item = {};
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/product/get-by-id/'+id).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
        this.item = res;
        setTimeout(() => {
          this.loadScripts();
        });
      }); 
    });
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/product/get-tuongtu/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.tuongtu = res;});
      });
      this._api.get('/api/category/get-category').takeUntil(this.unsubscribe).subscribe(res => {
        this.menus = res;
        
      }); 
      this._api.get('/api/brand/get-brand').takeUntil(this.unsubscribe).subscribe(res => {
        this.brands = res;
        
      }); 
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    alert('Thêm thành công!'); 
  }
}
