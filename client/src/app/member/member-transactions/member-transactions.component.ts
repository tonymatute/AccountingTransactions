import { GridtService } from './../../_services/grid.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from './../../_services/member.service';
import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-transactions',
  templateUrl: './member-transactions.component.html',
  styleUrls: ['./member-transactions.component.css'],
})
export class MemberTransactionsComponent implements OnInit {
  member: Member;
  troop: string = environment.troop;
  charteredOrganization = environment.charteredOrganization;
  troopLocation = environment.troopLocation;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private gridService: GridtService
  ) {}

  ngOnInit(): void {
    this.gridService.loadSortableScripts();
    this.loadMember();
  }

  loadMember() {
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });
  }

  isRechartedDateDue() {
    var today = new Date();
    var rechartedDate = new Date('10/30/' + today.getFullYear());  

    if (this.member.rechartedDate != null) {
      var lastRechartedDate = new Date(this.member.rechartedDate);
      var diff = (rechartedDate.getTime() - lastRechartedDate.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 

     if (diffDays < 0)
      return true;
    }
    return false;
  }

  RechartedDateDueColor() {
    var x = this.isRechartedDateDue();   
      return this.isRechartedDateDue() ? 'red' : 'green';
    }
   
  

}
