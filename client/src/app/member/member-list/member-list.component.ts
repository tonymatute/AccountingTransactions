import { LookupService } from './../../_services/lookup.service';
import { MemberService } from './../../_services/member.service';
import { MemberParams } from './../../_models/memberParams';
import { Member } from './../../_models/member';
import { Pagination } from './../../_models/pagination';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  pagination: Pagination;
  members: Member[];
  memberParams: MemberParams;
  //patrols: LookUpTable[];
  loading: boolean = false;
  constructor(
    private memberService: MemberService,
    private lookUpService: LookupService
  ) {
    this.memberParams = this.memberService.getMemberParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.loading = true;
    this.memberService.setMemberParams(this.memberParams);
    this.memberService.getMembers(this.memberParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }
  loadMembersFromRadioButton() { 
    this.memberParams.pageNumber = 1;
    this.memberService.setMemberParams(this.memberParams);
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.memberParams.pageNumber = event.page;
    this.memberService.setMemberParams(this.memberParams);
    this.loadMembers();
  }

  resetFilter() {
    this.memberParams = this.memberService.resetParamParams();
    this.loadMembers();
  }


  onKeyUp(boxInput: HTMLInputElement) {
    let length = boxInput.value.length; //this will have the length of the text entered in the input box
    if (length >= 3) {
      if (boxInput.name == 'lastName') {
        this.memberParams.lastName = boxInput.value;
      }
      if (boxInput.name == 'firstName') {
        this.memberParams.firstName = boxInput.value;
      }
      this.memberService.setMemberParams(this.memberParams);
      this.loadMembers();
    }
  }

  selectedChange(value) {
    this.memberParams.patrolId = value;
    this.memberService.setMemberParams(this.memberParams);
    this.loadMembers();
  }

  deleteScoutFromCache() {
    this.memberService.deleteMemberFromCache(this.memberParams);
    }

}
