import { ConfirmService } from './../_services/confirm.service';

import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) { }
  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  // canDeactivate(
  //   component: ScoutEditComponent): Observable<boolean> | boolean {
  //   // if (component.editForm.dirty) {
  //   //   return this.confirmService.confirm("Confirmation",'Are you sure you want to continue? Any unsaved changes will be lost.')
  //   // }
  //   return true;
  // }
  
}
