import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedPathGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastrService: ToastrService) {}

  canActivate(): Observable<boolean>   {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toastrService.error("Navigation invalid")
      })
    )
  }
  
}
