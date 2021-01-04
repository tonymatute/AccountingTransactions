import { ScoutService } from 'src/app/_services/scout.service';
import { LookUpTable } from './../../_models/lookUpTable';
import { LookupService } from './../../_services/lookup.service';
import { Scout } from './../../_models/scout';
import { RankAddModalComponent } from './../../modals/rank-add-modal/rank-add-modal.component';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rank } from 'src/app/_models/rank';
import { GridtService } from 'src/app/_services/grid.service';

@Component({
  selector: 'app-scout-rank',
  templateUrl: './scout-rank.component.html',
  styleUrls: ['./scout-rank.component.css'],
})
export class ScoutRankComponent implements OnInit {
  @Input() ranks: Rank[];
  @Input() scout: Scout;
  rankList: LookUpTable[];

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
    this.ranks = this.sortData;
    this.lastRank = this.isContains(this.ranks, 'Eagle');
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

  dateFormatter(date) {
    var format = 'MM/dd/yyyy';
    var locale = 'en-US';
    var formattedDate = formatDate(date, format, locale);
    return formattedDate;
  }

  get sortData() {
    return this.ranks.sort((a, b) => {
      return <any>new Date(b.created) - <any>new Date(a.created);
    });
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
        rankLookupTable: this.getRankArray(),
      },
    };
    this.bsModalRef = this.modalService.show(RankAddModalComponent, config);
    this.bsModalRef.content.addScoutRank.subscribe((values) => {
      const newRank = {
        rank: values,
      };
      if (newRank) {        
        this.scoutService.addScoutRank(scout.memberId, newRank.rank).subscribe(() => {
          this.rankList.forEach(rank => {
            if (rank.id === newRank.rank.rankId) {
              newRank.rank.rankName = rank.display;
            }
          });
          
          scout.ranks.forEach(rank => {
            if (rank.activeRank) {
              rank.activeRank = false;
            }
          });

          scout.ranks.push(newRank.rank);
          scout.ranks = this.sortRanks(scout.ranks);
          this.lastRank = this.isContains(scout.ranks, 'Eagle');
        });      
      }
    });
  }

   sortRanks(ranks: Rank[]) {
    return ranks.sort((a, b) => {
      return <any>new Date(b.created) - <any>new Date(a.created);
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
