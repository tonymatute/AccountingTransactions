import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
             const modalStateErrors = [];
             
              // if (error.error) { 
              //   for (const key in error.error) {
              //     if (error.error[key]) {
              //       modalStateErrors.push(error.error[key].description);
              //     }
              //   }
              //   modalStateErrors.flat().forEach((err:any) => {
              //     this.toastr.error(err);
              //   }); 
              // }              
              // else 
              if (error.error.errors) {               
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                } 

                 modalStateErrors.flat().forEach(err => {
                  this.toastr.error(err);
                });               
              } else if(typeof(error.error) === 'object')  {
                this.toastr.error(error.statusText);
              } else {
                this.toastr.error(error.error);
              }
              break;            
            case 401:
              if (error.error) {
                this.toastr.error(error.error);
              } else {
                this.toastr.error("Unauthorized User");
              }              
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } }
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              this.toastr.error("something unexpected went very wrong!");
              console.log(error);              
              break;
          }
          
        }
          return throwError(error);
        })      
    )
  }
}