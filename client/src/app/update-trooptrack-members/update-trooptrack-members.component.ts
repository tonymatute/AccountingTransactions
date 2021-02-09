import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-trooptrack-members',
  templateUrl: './update-trooptrack-members.component.html',
  styleUrls: ['./update-trooptrack-members.component.css']
})
export class UpdateTrooptrackMembersComponent implements OnInit {
  updating: boolean = false;

  constructor( private memberService: MemberService, private router: Router) { }

  ngOnInit(): void {
    this.updateMembers();
  }

  updateMembers() {
    this.updating = true;
    this.memberService.updateTroopTrackMembers().subscribe(() => {
      this.updating = false;
      this.router.navigateByUrl("/member");     
    }) 

  }

}
