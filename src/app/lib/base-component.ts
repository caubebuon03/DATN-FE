import { Renderer2 } from "@angular/core";
import { Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { ApiService } from './api.service';
import { CartService } from './cart.service';



export class BaseComponent {
    public unsubscribe = new Subject();
    public _renderer:any;
    public _api: ApiService;
    public _cart: CartService;
    public _route: ActivatedRoute;
    constructor(injector: Injector) {  
       this._renderer = injector.get(Renderer2);
       this._api = injector.get(ApiService);
       this._cart = injector.get(CartService);
       this._route = injector.get(ActivatedRoute);
       } 
    public loadScripts() {
          this.renderExternalScript('./assets/main.js').onload = () => {
          }
        }
    public renderExternalScript(src: string): HTMLScriptElement {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;
          script.async = true;
          script.defer = true;
          this._renderer.appendChild(document.body, script);
          return script;
        }
 }