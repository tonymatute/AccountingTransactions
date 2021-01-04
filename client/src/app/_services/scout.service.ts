import { ScoutParams } from './../_models/scoutParams';
import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Scout } from './../_models/scout';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { AccountService } from './account.service';
import { Rank } from '../_models/rank';

@Injectable({
  providedIn: 'root',
})
export class ScoutService {
  baseUrl = environment.apiUrl;
  scouts: Scout[] = [];
  scoutParams: ScoutParams;
  scoutCache = new Map();

  constructor(private http: HttpClient, private accountService: AccountService)
  {     
    this.scoutParams = new ScoutParams();
  }  

  deleteScoutFromCache(scoutParams: ScoutParams) {
    var response = this.scoutCache.get(Object.values(scoutParams).join('-'));
    if (response) {
      this.scoutCache.delete(Object.values(scoutParams).join('-'));
    }
  }

  getScouts(scoutParams: ScoutParams) {
    var response = this.scoutCache.get(Object.values(scoutParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(scoutParams);    

    return getPaginationResult<Scout[]>(this.baseUrl + 'scout', params, this.http).pipe(
      map(response => {
        this.scoutCache.set(Object.values(scoutParams).join('-'), response);
        return response;        
      })
    )
  }

  getScout(id: number) {
    const scout = [...this.scoutCache.values()]
      .reduce((previousValueArr, currentValue) => previousValueArr.concat(currentValue.result), [])
      .find((scout: Scout) => scout.memberId === id);
       
    if (scout) {
      return of(scout);
    }
    return this.http.get<Scout>(this.baseUrl + 'scout/' + id);
    
  }

  updateScout(scout: Scout) {
    return this.http.put(this.baseUrl + 'scout/', scout).pipe(
      map(() => {
        const index = this.scouts.indexOf(scout);
        this.scouts[index] = scout;
      })
    );
  }

  deletePhoto(publicId: string) {
    return this.http.delete(this.baseUrl + 'scout/delete-photo/' + publicId);
  }

  resetScoutParams() {
    this.scoutParams = new ScoutParams();
    return this.scoutParams;
  }

  getScoutParams() {
    return this.scoutParams;
  }

  setScoutParams(scoutParams: ScoutParams) {
    this.scoutParams = scoutParams;
  }

  addScoutRank(id: number, rank: Rank) {
    let params = new HttpParams();
   
    params = params.append('rankName', rank.rankName.toString());
    params = params.append('activeRank', rank.activeRank.toString());
    params = params.append('created', rank.created.toString());
    params = params.append('rankId', rank.rankId.toString());
    
    return this.http.post(this.baseUrl + 'scout/add-rank/' + id + '?rank=' + params , {});
  }

}
