import { HttpClient } from '@angular/common/http';
import { Scout } from './../_models/scout';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchParams } from '../_models/searchParams';
import { of } from 'rxjs';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
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

  getScouts(searchParams: SearchParams) { 
    var response = this.scoutCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    return getPaginationResult<Scout[]>(this.baseUrl + 'scout', params, this.http).pipe(
      map((response) => {
        this.scoutCache.set(Object.values(searchParams).join('-'), response);
        return response;
      })
    );
  }

  getScout(id: number) {
    const scout = [...this.scoutCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((scout: Scout) => scout.memberId === id);

    if (scout) {
      return of(scout);
    }
    return this.http.get<Scout>(this.baseUrl + 'scout/' + id);
  }


}
