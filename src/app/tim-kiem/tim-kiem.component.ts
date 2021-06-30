import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs-compat';
import { BaseComponent } from '../lib/base-component';
declare var $: any;

@Component({
  selector: 'app-tim-kiem',
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.css']
})
export class TimKiemComponent extends BaseComponent implements OnInit {
  searchResult: any;
  spResults: any;
  tongsl: any;
  keyWord: any;
  danhMuc: any;
  thuongHieu: any;
  minPrice: any;
  maxPrice: any;
  sort: any;
  ram: any;
  index: any;
  size: any;
  menus: any;
  total: any;
  brands: any;
  formGia: any;
  listRam = [2, 4, 8, 16];
  constructor(private injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.getTimKiem();
    this.buildFormGia();
    this.loadScripts();

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

  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }

  highlightSelectedChoice(choiceID) {
    var temp = document.getElementById(choiceID);
    if (temp) {
      temp.className = "selected-choice";
    }
  }
  unhighlightChoices(type: string, choiceID: string[]) {
    choiceID.forEach(element => {
      var temp = document.getElementById(type + element);
      if (temp) {
        temp.className = "unselected-choice";
      }
    });

  }

  // !!! '%20' là dấu cách trong đỉa chỉ trên web, tức là ' '
  getTimKiem() {

    if (localStorage.getItem('searchResult')) {
      this.searchResult = JSON.parse(localStorage.getItem('searchResult'));
      this.spResults = this.searchResult.data;
      this.tongsl = this.searchResult.total;
      console.log(this.tongsl);
      this.keyWord = this.searchResult.keyWord;
      this.minPrice = this.searchResult.minPrice;
      this.maxPrice = this.searchResult.maxPrice;
      this.danhMuc = this.searchResult.danhMuc;
      this.ram = this.searchResult.ram;
      this.thuongHieu = this.searchResult.thuongHieu;
      this.sort = this.searchResult.sort;
      this.index = this.searchResult.index;
      this.size = this.searchResult.size;

    }
    else {
      this.searchResult = 'Empty';
    }
  }

  loadPage(page) {

    this.timKiem(this.keyWord, this.danhMuc, this.thuongHieu, this.ram, this.minPrice, this.maxPrice, this.sort, page, this.size);

  }

  buildFormGia() {
    this.formGia = this.fb.group({
      'giaMin': [],
      'giaMax': []
    });
  }

  locTheoGia() {
    let giaMin = this.formGia.get('giaMin') && this.formGia.get('giaMin').value != '' && !isNaN(parseInt(this.formGia.get('giaMin').value)) ? parseInt(this.formGia.get('giaMin').value) : 0;
    let giaMax = this.formGia.get('giaMax') && this.formGia.get('giaMax').value != '' && !isNaN(parseInt(this.formGia.get('giaMax').value)) ? parseInt(this.formGia.get('giaMax').value) : 0;
    this.timKiem(this.keyWord, this.danhMuc, this.thuongHieu, this.ram, giaMin, giaMax, this.sort, 1, this.size);
  }

  locTheoRam(ram) {
    this.timKiem(this.keyWord, this.danhMuc, this.thuongHieu, ram, this.minPrice, this.maxPrice, this.sort, this.index, this.size);
  }

  locTheoDanhMuc(maDanhMuc) {
    if (maDanhMuc == '%20') {
      this.highlightSelectedChoice('danhMuc_0');
    }
    else {
      this.unhighlightChoices("danhMuc_", ['0']);
      this.highlightSelectedChoice('danhMuc_' + maDanhMuc);
    }

    var needToUnhighlight = this.menus[0].children.filter(x => x.category_id !== maDanhMuc);
    var listID = [];
    needToUnhighlight.map((x) => { if (x && x.category_id) listID.push(x.category_id) });
    this.unhighlightChoices("danhMuc_", listID);
    this.timKiem(this.keyWord, maDanhMuc, this.thuongHieu, this.ram, this.minPrice, this.maxPrice, this.sort, this.index, this.size);
  }

  locTheoThuongHieu(maThuongHieu) {
    if (maThuongHieu == '%20') {
      this.highlightSelectedChoice('thuongHieu_0');
    }
    else {
      this.unhighlightChoices("thuongHieu", ['_0']);
      this.highlightSelectedChoice('thuongHieu_' + maThuongHieu);
    }

    var needToUnhighlight = this.brands[0].children.filter(x => x.brand_id !== maThuongHieu);
    var listID = [];
    needToUnhighlight.map((x) => { if (x && x.brand_id) listID.push(x.brand_id) });
    this.unhighlightChoices("thuongHieu_", listID);
    this.timKiem(this.keyWord, this.danhMuc, maThuongHieu, this.ram, this.minPrice, this.maxPrice, this.sort, this.index, this.size);
  }

  timKiem(keyWord, maDanhMuc, maThuongHieu, ram, minPrice, maxPrice, sort, pageIndex, pageSize) {
    this._api.
      get('/api/Product' + '/tim-kiem-trang-chu/' + keyWord + '/' + maDanhMuc + '/' + maThuongHieu + '/' + ram + '/' + minPrice + '/' + maxPrice + '/' + sort + '/' + pageIndex + '/' + pageSize)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.searchResult = res;
        this.spResults = this.searchResult.data;
        this.tongsl = this.searchResult.totalItems;
        var searchResult = {
          keyWord: keyWord,
          danhMuc: maDanhMuc,
          thuongHieu: maThuongHieu,
          ram: ram,
          data: this.spResults,
          total: this.tongsl,
          sort: sort,
          minPrice: minPrice,
          maxPrice: maxPrice,
          index: pageIndex,
          size: pageSize
        }
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
        this.getTimKiem();
      });
  }
}
