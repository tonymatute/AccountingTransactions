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
  rank: Partial<Rank> = {rankId:0,activeRank:true,rankName: ''}
  rankLookupTable: LookUpTable[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
   
  }

  addRank() {

    this.addScoutRank.emit(this.rank);
    this.bsModalRef.hide();
  }



}
