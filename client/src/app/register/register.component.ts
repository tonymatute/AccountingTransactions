import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  validationErrors: string[] = [];


  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]],
      confirmPassword: ["", [Validators.required, this.matchPasswords('password')]],
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      confirmEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.matchEmail('email')
      ]),
    });
  }

  matchEmail(email: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[email].value
        ? null
        : { emailMatch: true };
    };
  }

  matchPasswords(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }

  register() {    
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl("/confirmed-email-sent");
    }, error => {   
        this.validationErrors = error;
    })
  }
  
  cancel() {
    this.router.navigateByUrl('/');
  }

}
