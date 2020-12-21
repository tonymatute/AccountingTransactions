import { LookupService } from './../../_services/lookup.service';
import { LookUpTable } from './../../_models/lookUpTable';
import { User } from './../../_models/user';
import { SearchParams } from './../../_models/searchParams';
import { Scout } from './../../_models/scout';
import { Pagination } from './../../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { ScoutService } from 'src/app/_services/scout.service';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.css']
})
export class ScoutListComponent implements OnInit {
  pagination: Pagination;
  scouts: Scout[];
  searchParams: SearchParams;
  user: User;
   patrols: LookUpTable[];  
  //patrols;

  constructor(
    private scoutService: ScoutService,
    private accountService: AccountService,
    private lookUpService: LookupService)
  { 
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.searchParams = new SearchParams();
    });
  }

  ngOnInit(): void {
   
    this.loadScouts();
    this.getPatrols();
  }

  getPatrols() {
    this.lookUpService.getPatrols().subscribe(patrols => {
      this.patrols = patrols;
  })
}

  loadScouts() {

    this.scoutService.setSearchParams(this.searchParams);
    this.scoutService.getScouts(this.searchParams).subscribe(response => {
      this.scouts = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.page;
    this.scoutService.setSearchParams(this.searchParams);
    this.loadScouts();
  }

  resetFilter() {
    this.searchParams = this.scoutService.resetSearchParams();
    this.loadScouts();
  }


}
