
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Rank } from 'src/app/_models/rank';
import { GridtService } from 'src/app/_services/grid.service';

@Component({
  selector: 'app-scout-rank',
  templateUrl: './scout-rank.component.html',
  styleUrls: ['./scout-rank.component.css'],
})
export class ScoutRankComponent implements OnInit {
  @Input() ranks: Rank[];  
   lastRank = false;
   public p: number = 1;
  constructor(private gridService: GridtService) {
  }
  
  ngOnInit(): void {
    this.gridService.loadSortableScripts();
    this.ranks = this.sortData;
    this.lastRank = this.isContains(this.ranks, "Eagle");
  }

  
   isContains(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
      contains =  json[key].rankName === value;            
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

  addNewHandler() {
    alert("add new");
  }

  get sortData() {
    return this.ranks.sort((a, b) => {
      return <any>new Date(b.created) - <any>new Date(a.created);
    });
  }

  



}


