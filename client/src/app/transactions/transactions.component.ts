import { LookUpTable } from './../_models/lookUpTable';
import { environment } from 'src/environments/environment';
import { Transaction } from './../_models/transaction';
import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { BtnCellRenderer } from '../_buttons/btn-cell-renderer/btn-cell-renderer.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() lookUpTable: LookUpTable[];

  gridApi;
  gridColumnApi;
  gridOptions;
  paginationPageSize;
  paginationNumberFormatter;
  rowSelection;
  domLayout;
  statusBar;
  columnDefs;
  defaultColDef;
  totalCredit: number = 0;
  TotalDebit: number = 0;
  total: number = 0;
  rowData: Transaction[];

  frameworkComponents: { btnCellRenderer: typeof BtnCellRenderer; };

  constructor() {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer
    };

    this.columnDefs = [
      {
        headerName: '',
        maxWidth: 65,  
        cellRenderer: "btnCellRenderer",
        cellRendererParams: {
          clicked: function(field: any) {
            alert(`${field} was clicked`);
          }
        },               
      },
      {
        headerName: 'Type',
        field: 'transactionType',
        maxWidth: 200, 
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
      {
        headerName: 'Check',
        field: 'checkNumber',
        maxWidth: 115,
        filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
      {
        headerName: 'Trip',
        field: 'activity',
        maxWidth: 200,
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
      {
        headerName: 'Credit',
        field: 'transactionCredit',
        valueFormatter: (params) =>
          this.currencyFormatter(params.data.transactionCredit, '$'),
        maxWidth: 115,
        filter: 'agNumberColumnFilter',
        cellStyle: function (params) {
          if (params.value < '0') {
            return { color: 'red' };
          } else {
            return null;
          }
        },
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
      {
        headerName: 'Debit',
        field: 'transactionDebit',
        valueFormatter: (params) =>
          this.currencyFormatter(params.data.transactionDebit, '$'),
        maxWidth: 110,
        filter: 'agNumberColumnFilter',
        cellStyle: function (params) {
          if (params.value < '0') {
            return { color: 'red' };
          } else {
            return null;
          }
        },
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
      {
        headerName: 'Date',
        valueFormatter: (params) =>
          this.dateFormatter(params.data.transactionDateTime),
        field: 'transactionDateTime',
        maxWidth: 160,       
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
          debounceMs: 200,
        },
      },
    ];

    this.defaultColDef = {
      flex: 1,
      sortable: true,
      resizable: false,
    };

    this.rowSelection = 'single';
    this.domLayout = 'autoHeight';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit(): void {
    this.initGrid();
  }

  initGrid() {
    this.calculateTotals(this.transactions);    
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.transactions;
  }

  calculateTotals(totalTransactions) {
    var result = 0;

    totalTransactions.forEach((transaction:Transaction) => {
      if (typeof transaction.transactionCredit === 'number')
        this.totalCredit += transaction.transactionCredit;
      if (typeof transaction.transactionDebit === 'number')
        this.TotalDebit += transaction.transactionDebit;
    });
    this.total = this.totalCredit - this.TotalDebit;
  }

  currencyFormatter(currency: number, sign: string) {
    var sansDec = currency.toFixed(2);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
  }

  getColor(balance: number): string {
    if (balance === 0) return null;
    return balance > 0 ? 'green' : 'red';
  }

  dateFormatter(date) {
    var format = 'short';
    var locale = 'en-US';
    var formattedDate = formatDate(date, format, locale);
    return formattedDate;
  }  

  addNewHandler() {
    alert('Add new');
  }
  
}
