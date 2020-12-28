import { ScoutService } from './../_services/scout.service';
import { Scout } from './../_models/scout';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScoutDetailedResolver implements Resolve<Scout> {

    constructor(private scoutService: ScoutService ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Scout> {
        return this.scoutService.getScout( Number( route.paramMap.get('id')));
    }

}