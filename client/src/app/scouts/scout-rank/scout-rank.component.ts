import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CheckboxRenderer } from 'src/app/_component_extentions/checkbox-renderer/checkbox-renderer.component';
import { Rank } from 'src/app/_models/rank';

@Component({
  selector: 'app-scout-rank',
  templateUrl: './scout-rank.component.html',
  styleUrls: ['./scout-rank.component.css'],
})
export class ScoutRankComponent implements OnInit {
  @Input() ranks: Rank[];

  gridApi;
  gridColumnApi;
  gridOptions;
  rowSelection;
  domLayout;
  columnDefs;
  defaultColDef;
  frameworkComponents;

  constructor() {
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer,
    };

    this.columnDefs = [
      {
        headerName: 'Active',
        field: 'activeRank',
        maxWidth: 90,
        cellRenderer: 'checkboxRenderer',
        editable: false,
      },

      {
        headerName: 'Rank',
        field: 'rankName',
        maxWidth: 160,
      },
      {
        headerName: 'Rank Date',
        field: 'rankDateTime',
        maxWidth: 140,
        valueFormatter: (params) =>
          this.dateFormatter(params.data.rankDateTime),
      },
    ];

    this.defaultColDef = {
      flex: 1,
      sortable: false,
      resizable: false,
    };
    this.rowSelection = 'single';
    this.domLayout = 'autoHeight';
  }

  ngOnInit(): void {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
}
