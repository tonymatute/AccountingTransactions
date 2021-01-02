import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  loginForm: FormGroup;
  model: any = {};
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/scouts');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  cancel() {
    this.router.navigateByUrl('/');
  }
}
