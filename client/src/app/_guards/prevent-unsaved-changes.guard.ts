import { ConfirmService } from './../_services/confirm.service';
import { ScoutEditComponent } from './../scouts/scout-edit/scout-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) { }

  canDeactivate(
    component: ScoutEditComponent): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      return this.confirmService.confirm("Confirmation",'Are you sure you want to continue? Any unsaved changes will be lost.')
    }
    return true;
  }
  
}
