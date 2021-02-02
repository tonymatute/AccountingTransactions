import { Adult } from './../_models/adult';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdultParams } from '../_models/adultParams';
import { of } from 'rxjs';
import { getAdultPaginationHeaders, getPaginationResult } from './paginationHelper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdultService {
  baseUrl = environment.apiUrl;
  adults: Adult[] = [];
  adultParams: AdultParams;
  adultsCache = new Map();

  constructor(private http: HttpClient) { 
    this.adultParams = new AdultParams();
  }

  resetAdultParams() {
    this.adultParams = new AdultParams();
    return this.adultParams;
  }

  getAdultParams() {
    return this.adultParams;
  }

  setAdultParams(adultParams: AdultParams) {
    this.adultParams = adultParams;
  }

  addNewAdultMember(adult: Adult) {
    return this.http.post(this.baseUrl + 'Adults/add-adult/', adult);
  }

  getAdults(adultParams:AdultParams) {
    var response = this.adultsCache.get(Object.values(adultParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getAdultPaginationHeaders(adultParams);    

    return getPaginationResult<Adult[]>(this.baseUrl + 'Adults', params, this.http).pipe(
      map(response => {
        this.adultsCache.set(Object.values(adultParams).join('-'), response);
        return response;        
      })
    )
  }

  deleteAdultFromCache(adultParams: AdultParams) {
    var response = this.adultsCache.get(Object.values(adultParams).join('-'));
    if (response) {
      this.adultsCache.delete(Object.values(adultParams).join('-'));
    }
  }

}
