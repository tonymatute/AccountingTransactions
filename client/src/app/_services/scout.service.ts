import { LookUpTable } from './../_models/lookUpTable';
import { HttpClient } from '@angular/common/http';
import { Scout } from './../_models/scout';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchParams } from '../_models/searchParams';
import { of } from 'rxjs';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScoutService {
  baseUrl = environment.apiUrl;
  scouts: Scout[] = [];
  scoutCache = new Map();
  searchParams: SearchParams;

  constructor(private http: HttpClient) {
    this.searchParams = new SearchParams();
  }

  getSearchParams() {
    return this.searchParams;
  }

  setSearchParams(searchParams: SearchParams) {
    this.searchParams = searchParams;
  }

  resetSearchParams() {
    this.searchParams = new SearchParams();
    return this.searchParams;
  }

  // getScouts(searchParams: SearchParams) {
  getScouts() {
    if (this.scouts.length > 0) return of(this.scouts);
    
     return this.http.get<Scout[]>(this.baseUrl + 'scout').pipe(
      map((scouts) => {
        this.scouts = scouts;
        return scouts;
      })
    );

    // var response = this.scoutCache.get(Object.values(searchParams).join('-'));
    // if (response) {
    //   return of(response);
    // }

    // let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);

    // params = params.append('lastName', searchParams.lastName);
    // params = params.append('firstName', searchParams.firstName);
    // params = params.append('patrolId', searchParams.patrolId);
    // params = params.append('active', searchParams.active.toString());
    // params = params.append('orderBy', searchParams.orderBy);

    // return getPaginationResult<Scout[]>(this.baseUrl + 'scout', params, this.http).pipe(
    //   map((response) => {
    //     this.scoutCache.set(Object.values(searchParams).join('-'), response);
    //     return response;
    //   })
    // );
  }

  getScout(id: number) {
    const scout = this.scouts.find((s) => (s.memberId === id));
    if (scout !== undefined) return of(scout);

    return this.http.get<Scout>(this.baseUrl + 'scout/' + id);
    //  const scout = [...this.scoutCache.values()]
    //   .reduce((arr, elem) => arr.concat(elem.result), [])
    //   .find((scout: Scout) => scout.memberId === Number(id));

    // if (scout) {
    //   return of(scout);
    // }
    //
  }

  updateScout(scout: Scout) {
    return this.http.put(this.baseUrl + 'scout/', scout).pipe(
      map(() => {
        const index = this.scouts.indexOf(scout);
        this.scouts[index] = scout;
      })
    );
  }
}
