import { Adult } from './../_models/adult';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdultService {
  baseUrl = environment.apiUrl;
  adults: Adult[] = [];

  constructor(private http: HttpClient) { }

  addNewAdultMember(adult: Adult) {
    return this.http.post(this.baseUrl + 'Adults/add-adult/', adult);
  }

}
