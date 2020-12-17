import { Scout } from './../../_models/scout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scout-card',
  templateUrl: './scout-card.component.html',
  styleUrls: ['./scout-card.component.css']
})
export class ScoutCardComponent implements OnInit {
  @Input() scout: Scout;
  constructor() { }

  ngOnInit(): void {
  }

}
