import { Component } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { ITooltipParams, IAfterGuiAttachedParams } from '@ag-grid-community/core';

@Component({
  selector: 'tooltip-component',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltip implements ITooltipAngularComp  {
   params: any;
    data: any;
  
  constructor() { }
  agInit(params: ITooltipParams): void {
    this.params = params;

    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.data.type = this.params.type || 'primary';
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    
  }

  

}
