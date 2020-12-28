import { LookupService } from './../../_services/lookup.service';
import { LookUpTable } from './../../_models/lookUpTable';
import { ScoutParams } from '../../_models/scoutParams';
import { Scout } from './../../_models/scout';
import { Pagination } from './../../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { ScoutService } from 'src/app/_services/scout.service';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.css'],
})
export class ScoutListComponent implements OnInit {
  pagination: Pagination;
  scouts: Scout[];
  scoutParams: ScoutParams;
  patrols: LookUpTable[];
  loading: boolean = false;

  constructor(
    private scoutService: ScoutService,
    private lookUpService: LookupService)
  {
    this.scoutParams = this.scoutService.getScoutParams();
  }

  ngOnInit(): void {
    this.loadScouts();
    this.getPatrols();
  }

  loadScouts() {
    this.loading = true;
    this.scoutService.setScoutParams(this.scoutParams);
    this.scoutService.getScouts(this.scoutParams).subscribe((response) => {
      this.scouts = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  getPatrols() {
    this.lookUpService.getPatrols().subscribe((patrols) => {
      this.patrols = patrols;
    });
  }
  pageChanged(event: any) {
    this.scoutParams.pageNumber = event.page;
    this.scoutService.setScoutParams(this.scoutParams);
    this.loadScouts();
  }

  resetFilter() {
    this.scoutParams = this.scoutService.resetScoutParams();
    this.loadScouts();
  }

  onActiveChange(e: any) {

    this.scoutParams.active = !this.scoutParams.active;
    this.scoutService.setScoutParams(this.scoutParams);
    this.loadScouts();
  }

  onKeyUp(boxInput: HTMLInputElement) {
    let length = boxInput.value.length; //this will have the length of the text entered in the input box
    if (length >= 3) {
      if (boxInput.name == 'lastName') {
        this.scoutParams.lastName = boxInput.value;
      }
      if (boxInput.name == 'firstName') {
        this.scoutParams.firstName = boxInput.value;
      }
      this.scoutService.setScoutParams(this.scoutParams);
      this.loadScouts();
    }
  }

  selectedChange(value) {
    this.scoutParams.patrolId = value;
    this.scoutService.setScoutParams(this.scoutParams);
    this.loadScouts();
  }

  deleteScoutFromCache() {
    this.scoutService.deleteScoutFromCache(this.scoutParams);
    }

}
