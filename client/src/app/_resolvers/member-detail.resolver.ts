import { MemberService } from './../_services/member.service';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<Member> {
  constructor(private memberService: MemberService ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember( Number( route.paramMap.get('id')));
    }
}
