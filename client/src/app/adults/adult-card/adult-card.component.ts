import { Component, Input, OnInit } from '@angular/core';
import { Adult } from 'src/app/_models/adult';

@Component({
  selector: 'app-adult-card',
  templateUrl: './adult-card.component.html',
  styleUrls: ['./adult-card.component.css']
})
export class AdultCardComponent implements OnInit {
  @Input() adult: Adult;
  constructor() { }

  ngOnInit(): void {
  }

}
