import { Component, Input, OnInit } from '@angular/core';
import { Parent } from 'src/app/_models/parent';

@Component({
  selector: 'app-scout-parent',
  templateUrl: './scout-parent.component.html',
  styleUrls: ['./scout-parent.component.css']
})
export class ScoutParentComponent implements OnInit {
  @Input() parents: Parent[];
  constructor() { }

  ngOnInit(): void {
  }

}
