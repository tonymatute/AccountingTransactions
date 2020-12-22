import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'btn-cell-renderer',
  template: `
  
    <button class="btn btn-sm btn-primary rounded mr-2" (click)="btnEditHandler($event)">Edit</button>
    
    `,
  
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnEditHandler(event) {
    this.params.clicked(this.params.value);
  }

  

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
