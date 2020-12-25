import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { IAfterGuiAttachedParams } from '@ag-grid-community/core';

@Component({
  selector: 'checkbox-renderer',
  template: `
    <input 
      type="checkbox" 
      class="form-check-input ml-2 mt-3"
      (click)="checkedHandler($event)"
      [checked]="params.value"
    />
`,
})
export class CheckboxRenderer implements ICellRendererAngularComp, OnDestroy {
  ngOnDestroy(): void {
    
  }
  refresh(params: any): boolean {
    return true;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    
  }
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  checkedHandler(event) {
      let checked = event.target.checked;
      let colId = this.params.column.colId;
      this.params.node.setDataValue(colId, checked);
  }
}
