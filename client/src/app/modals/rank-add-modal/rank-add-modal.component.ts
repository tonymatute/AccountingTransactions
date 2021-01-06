import { ScoutRank } from './../../_models/scoutRank';
import { Rank } from './../../_models/rank';
import { LookUpTable } from './../../_models/lookUpTable';

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Scout } from 'src/app/_models/scout';

@Component({
  selector: 'rank-add-modal',
  templateUrl: './rank-add-modal.component.html',
  styleUrls: ['./rank-add-modal.component.css']
})
export class RankAddModalComponent implements OnInit {

  @Input() addScoutRank = new EventEmitter();
  scout: Scout;
  scoutRank: Partial<ScoutRank> = {rankId:0, activeRank:true ,rankName: ''}
  ranks: Rank[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
   
  }

  addRank() {

    this.addScoutRank.emit(this.scoutRank);
    this.bsModalRef.hide();
  }

  onSelected(e) { 
    this.scoutRank.rankName = this.ranks.filter(x => x.rankId === this.scoutRank.rankId)[0].rankName;   
  }


}
