
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LookUpTable } from '../_models/lookUpTable';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getPatrols() {
    return this.http.get<LookUpTable[]>(this.baseUrl + 'lookup/Patrol');
  }

  getActivities() {
    return this.http.get<LookUpTable[]>(this.baseUrl + 'lookup/Activity');
  }

  getExpenseTypes() {
    return this.http.get<LookUpTable[]>(this.baseUrl + 'lookup/Expense Type');
  }

  getLeaderships() {
    return this.http.get<LookUpTable[]>(this.baseUrl + 'lookup/GetLeadership');
  }

  getTransactionTypes() {
    return this.http.get<LookUpTable[]>(this.baseUrl + 'lookup/Transaction Type');
  }

  

}
