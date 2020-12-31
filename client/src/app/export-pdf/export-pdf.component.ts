import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.css']
})
export class ExportPdfComponent implements OnInit {
  api;
  columnApi;
  columnDefs;
  data;
  noDataReceived = true;
  gridState;
  afterPrint = false;
  afterFocus = false;
  isDesktopChrome = false;
  constructor() { }

  ngOnInit() {
    let exportedData = history.state;
    if (exportedData.gridState) {
      this.noDataReceived = false;
    }
    else {
      this.noDataReceived = true;
    }
    if (!this.noDataReceived) {
      this.data = exportedData.rowData;
      this.gridState = exportedData.gridState;
      this.columnDefs = exportedData.columnDefs;
    }
    // Check if the browser is desktop chrome (This is required for detecting when the print/save is finished, as Desktop chrome handles the print internally window focus based detection doesn't work)
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)){
      this.isDesktopChrome = false;
    }
    else if(/Chrome/i.test(navigator.userAgent)){
      this.isDesktopChrome = true;
    }
  }

  onGridReady(params){
  this.api = params.api;
  this.columnApi = params.columnApi;
  this.api.setColumnDefs(this.columnDefs);
  this.api.setRowData(this.data);
}

 onDataRendered(){
    // Grab the grid state from incoming component
    this.columnApi.setColumnState(this.gridState.colState);
    this.api.setSortModel(this.gridState.sortState);
    this.api.setFilterModel(this.gridState.filterState);
    this.api.sizeColumnsToFit();
    // call setDomLayout('print') for proper print layout (Api function provided by ag grid)
    this.api.setDomLayout('print');
    // window.blur();
    setTimeout(()=>{
      // call print after a time out so that print layout loads properly
      print();
      this.afterPrint = true;
    }, 400);
  }

// If the browser is Desktop Chrome the following even listener works perfectly
  @HostListener('window:afterprint')
  onAfterPrint() {
    if(this.isDesktopChrome){
      setTimeout(()=>{
      history.back();
    }, 200);
    }
  }

// For other browser detect print finish
  @HostListener('window:focus')
  onFocusafterprint() {
    if(!this.isDesktopChrome && this.afterPrint){
      setTimeout(()=>{
      history.back();
    }, 200);
  }
  }
}