import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../lib/base-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  menus: any;
  total: any;
  brands: any;
  formSearch: any;
  searchResponse: any;
  list_item: any;
  totalRecords: any;

  constructor(injector: Injector, private fb: FormBuilder,private router:Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildSearchForm();
    this._api.get('/api/category/get-category').takeUntil(this.unsubscribe).subscribe(res => {
      this.menus = res;
    });
    this._cart.items.subscribe((res) => {
      this.total = res ? res.length : 0;
    });

    this._api.get('/api/brand/get-brand').takeUntil(this.unsubscribe).subscribe(res => {
      this.brands = res;

    });
    this._cart.items.subscribe((res) => {
      this.total = res ? res.length : 0;
    });
  }

  buildSearchForm() {
    this.formSearch = this.fb.group({
      'keyWord': ['']
    });
  }

  timKiem() {
    let keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    let result = this._api.get('/api/Product' + '/tim-kiem-trang-chu/' + keyWord  )
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.searchResponse = res;
        this.list_item = this.searchResponse.data;
        this.totalRecords = this.searchResponse.totalItems;
        var searchResult = {
          keyWord: keyWord,
          danhMuc: '%20',
          thuongHieu:'%20',
          ram:0,
          data: this.list_item,
          total: this.totalRecords,
          sort:0,
          minPrice: 0,
          maxPrice: 0,
          index:1,
          size:12
        }
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
        this.router.navigate(['search']);
      });
  }
}
