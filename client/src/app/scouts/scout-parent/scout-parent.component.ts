import { Component, Input, OnInit } from '@angular/core';
import { Adult } from 'src/app/_models/adult';

@Component({
  selector: 'app-scout-parent',
  templateUrl: './scout-parent.component.html',
  styleUrls: ['./scout-parent.component.css']
})
export class ScoutParentComponent implements OnInit {
  @Input() parents: Adult[];
  constructor() { }

  ngOnInit(): void {
  }

}
