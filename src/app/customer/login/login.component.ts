import { BaseComponent } from '../../lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      customer_email: new FormControl('', [Validators.required,Validators.email]),
      customer_password: new FormControl('', [Validators.required,Validators.minLength(8),]),
      customer_name: new FormControl('', [Validators.required]),
      customer_phone: new FormControl('', [Validators.required,Validators.maxLength(10),]),
      customer_address: new FormControl('', [Validators.required])
    });
    this.loginForm = new FormGroup({
      customer_username: new FormControl('', Validators.required),
      customer_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      remember: new FormControl(false, []),
    });
  }
  onSubmitLogin(value: any) { 

  }
  onSubmitRegister(value: any) { 

    this._api.post('/api/customer/create-customer', {customer_email:value.customer_email, customer_password:value.customer_password, customer_name:value.customer_name, customer_phone:value.customer_phone,customer_address:value.customer_address} ).takeUntil(this.unsubscribe).subscribe(res => {
     alert('Đăng kí thành công');
      }, err => { });      

  }
}
