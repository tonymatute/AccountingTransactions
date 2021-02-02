import { AdultService } from './../../_services/adult.service';
import { Adult } from './../../_models/adult';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { AdultParams } from 'src/app/_models/adultParams';

@Component({
  selector: 'app-adult-list',
  templateUrl: './adult-list.component.html',
  styleUrls: ['./adult-list.component.css']
})
export class AdultListComponent implements OnInit {
  pagination: Pagination;
  adults: Adult[];
  adultParams: AdultParams;  
  loading: boolean = false;

  constructor(private adultService: AdultService) { 
    this.adultParams = this.adultService.getAdultParams();
  }

  ngOnInit(): void {
    this.loadAdults();
  }

  loadAdults() {
    this.loading = true;
    this.adultService.setAdultParams(this.adultParams);
    this.adultService.getAdults(this.adultParams).subscribe((response) => {
      this.adults = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any) {
    this.adultParams.pageNumber = event.page;
    this.adultService.setAdultParams(this.adultParams);
    this.loadAdults();
  }

  resetFilter() {
    this.adultParams = this.adultService.resetAdultParams();
    this.loadAdults();
  }

  onActiveChange(e: any) {
    this.adultParams.active = !this.adultParams.active;
    this.adultService.setAdultParams(this.adultParams);
    this.loadAdults();
  }

  onKeyUp(boxInput: HTMLInputElement) {
    let length = boxInput.value.length; //this will have the length of the text entered in the input box
    if (length >= 3) {
      if (boxInput.name == 'lastName') {
        this.adultParams.lastName = boxInput.value;
      }
      if (boxInput.name == 'firstName') {
        this.adultParams.firstName = boxInput.value;
      }
      this.adultService.setAdultParams(this.adultParams);
      this.loadAdults();
    }
  }

  deleteAdultFromCache() {
    this.adultService.deleteAdultFromCache(this.adultParams);
    }

}
