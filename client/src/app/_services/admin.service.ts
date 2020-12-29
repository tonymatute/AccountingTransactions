
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AvailableRole } from '../_models/availableRole';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + "admin/users-with-roles");
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  getAvailableRoles() {
    return this.http.get<Partial<AvailableRole[]>>(this.baseUrl + "admin/available-roles");
  }
}
