import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.css']
})
export class ErrorTestComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getNotFoundError() {
    return this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response => {
      console.log(response);      
    }, error => {
        console.log(error);        
    })
  }

  getValidationError() {
    return this.http.post(this.baseUrl + 'account/register',{}).subscribe(response => {
      console.log(response);      
    }, error => {                   
        if (error.error.errors) {
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              this.validationErrors.push(error.error.errors[key]);
            }
          }
        }
    })
  }

  getServerError() {
    return this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);      
    }, error => {
        console.log(error);        
    })
  }

  getBadRequestError() {
    return this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);      
    }, error => {
        console.log(error);        
    })
  }

  getAuthError() {
    return this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);      
    }, error => {
        console.log(error);        
    })
  }

}
