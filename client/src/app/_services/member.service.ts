import { Patrol } from './../_models/patrol';
import { ActivityType } from './../_models/activityType';
import { TransactionType } from './../_models/transactionType';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from './account.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MemberParams } from './../_models/memberParams';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  getMemberPaginationHeaders,
  getPaginationResult,
} from './paginationHelper';
import { Transaction } from '../_models/transaction';
import { NewTransaction } from '../_models/newTransaction';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberParams: MemberParams;
  memberCache = new Map();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
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

    return getPaginationResult<Member[]>(
      this.baseUrl + 'member',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(memberParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(id: number) {
    const member = [...this.memberCache.values()]
      .reduce(
        (previousValueArr, currentValue) =>
          previousValueArr.concat(currentValue.result),
        []
      )
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

  getTransactionTypes() {
    return this.http.get<TransactionType[]>(
      this.baseUrl + 'member/GetTransactionTypes'
    );
  }

  getActivityTypes() {
    return this.http.get<ActivityType[]>(
      this.baseUrl + 'member/GetActivityTypes'
    );
  }

  getPatrols() {
    return this.http.get<Patrol[]>(this.baseUrl + 'member/GetPatrolList');
  }

  addTransaction(memberId: number, transaction: NewTransaction) {
    let params = new HttpParams();

    params = params.append('TransactionTypeId', transaction.transactionTypeId);
    params = params.append('ActivityTypeId', (transaction.activityTypeId === '' ? '0' : transaction.activityTypeId)
    );
    params = params.append('TransactionCredit', transaction.transactionCredit);
    params = params.append('TransactionDebit', transaction.transactionDebit);
    params = params.append('CheckNumber', transaction.checkNumber);
    params = params.append('TransactionDate', transaction.transactionDate);
    params = params.append('TransactionTypeId', transaction.transactionTypeId);
    params = params.append('Comments', transaction.comments);

    return this.http.post( this.baseUrl + 'member/add-transaction/' + memberId +'?transaction=' + params, {} );
  }

  updateTroopTrackMembers() {
    return this.http.post(this.baseUrl + 'member/update-trooptrack-members', {});
  }

  deleteTransaction(memberId: number, transactionId: number) {
    return this.http.delete(this.baseUrl + 'member/delete-transaction?memberId=' + memberId + '&transactionId=' + transactionId, {});
  }

  

}
