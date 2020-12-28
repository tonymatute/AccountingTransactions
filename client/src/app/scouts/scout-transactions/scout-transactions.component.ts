import { LookUpTable } from './../../_models/lookUpTable';
import { ScoutService } from './../../_services/scout.service';
import { Scout } from './../../_models/scout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scout-transactions',
  templateUrl: './scout-transactions.component.html',
  styleUrls: ['./scout-transactions.component.css'],
})
export class ScoutTransactionsComponent implements OnInit {
  scout: Scout;
  troop: string = environment.troop;
  charteredOrganization = environment.charteredOrganization;
  troopLocation = environment.troopLocation;

  constructor(
    private scoutService: ScoutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadScout();
    
  }

  loadScout() {
    this.route.data.subscribe(data => {
      this.scout = data.scout;
    });
  }


  
}
