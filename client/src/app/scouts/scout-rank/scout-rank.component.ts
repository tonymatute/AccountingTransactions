
import { ScoutService } from 'src/app/_services/scout.service';
import { LookupService } from './../../_services/lookup.service';
import { Scout } from './../../_models/scout';
import { RankAddModalComponent } from './../../modals/rank-add-modal/rank-add-modal.component';

import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rank } from 'src/app/_models/rank';
import { GridtService } from 'src/app/_services/grid.service';
import { ScoutRank } from 'src/app/_models/scoutRank';

@Component({
  selector: 'app-scout-rank',
  templateUrl: './scout-rank.component.html',
  styleUrls: ['./scout-rank.component.css'],
})
export class ScoutRankComponent implements OnInit {
  scoutRanks: ScoutRank[];
  @Input() scout: Scout;
  rankList: Rank[];

  bsModalRef: BsModalRef;

  lastRank = false;
  public p: number = 1;

  constructor(
    private gridService: GridtService,
    private modalService: BsModalService,
    private lookupService: LookupService,
    private scoutService: ScoutService
  ) {}

  ngOnInit(): void {
    this.gridService.loadSortableScripts();
    this.scoutRanks = this.gridService.sortRanksByDateDesc(this.scout.scoutRanks);
    this.lastRank = this.isContains(this.scoutRanks, 'Eagle');
    this.getRankList();
  }

  isContains(json, value) {
    let contains = false;
    Object.keys(json).some((key) => {
      contains = json[key].rankName === value;
      return contains;
    });
    return contains;
  }

  getRankList() {
    this.lookupService.getRanks().subscribe((ranks) => {
      this.rankList = ranks;
    });
  }

  openRankAddModal(scout: Scout) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        scout,
        ranks: this.getRankArray(),
      },
    };
    this.bsModalRef = this.modalService.show(RankAddModalComponent, config);
    this.bsModalRef.content.addScoutRank.subscribe((values) => {
      const newRank = {
        rank: values,
      };
      if (newRank) {        
        this.scoutService.addScoutRank(scout.memberId, newRank.rank).subscribe(() => {   
          scout.scoutRanks.forEach(rank => {
            if (rank.activeRank) {
              rank.activeRank = false;
            }
          });

          scout.scoutRanks.push(newRank.rank);
          scout.scoutRanks = this.gridService.sortRanksByDateDesc(scout.scoutRanks);
          this.lastRank = this.isContains(scout.scoutRanks, 'Eagle');
          window.location.reload();
          
        });      
      }
    });
  }


  private getRankArray() {
    const ranks = [];

    this.rankList.forEach((rank) => {
      ranks.push(rank);
    });
    return ranks;
  }


}
