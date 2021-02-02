import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { MemberParams } from './../_models/memberParams';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getMemberPaginationHeaders, getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberParams: MemberParams;
  memberCache = new Map();

  constructor(private http: HttpClient, private accountService: AccountService)
  {
    this.memberParams = new MemberParams();
  }

  deleteMemberFromCache(memberParams: MemberParams) {
    var response = this.memberCache.get(Object.values(memberParams).join('-'));
    if (response) {
      this.memberCache.delete(Object.values(memberParams).join('-'));
    }
  }

  getMembers(memberParams: MemberParams) {
    var response = this.memberCache.get(Object.values(memberParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getMemberPaginationHeaders(memberParams);    

    return getPaginationResult<Member[]>(this.baseUrl + 'member', params, this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(memberParams).join('-'), response);
        return response;        
      })
    )
  }

  getMember(id: number) {
    const member = [...this.memberCache.values()]
      .reduce((previousValueArr, currentValue) => previousValueArr.concat(currentValue.result), [])
      .find((member: Member) => member.memberId === id);
       
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'member/' + id);
    
  }

  resetParamParams() {
    this.memberParams = new MemberParams();
    return this.memberParams;
  }

  getMemberParams() {
    return this.memberParams;
  }

  setMemberParams(memberParams: MemberParams) {
    this.memberParams = memberParams;
  }

}