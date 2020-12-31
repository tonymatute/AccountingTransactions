
import { LookUpTable } from './../_models/lookUpTable';
import { Transaction } from './../_models/transaction';
import { Component, OnInit, Input, ViewChild } from '@angular/core';



import { Router } from '@angular/router';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() lookUpTable: LookUpTable[];
  totalCredit: number = 0;
  TotalDebit: number = 0;
  total: number = 0;
  public page: number = 1;

  constructor(private router: Router) { }
    
    
  ngOnInit(): void {
    this.transactions = this.sortData;
    this.calculateTotals(this.transactions);  
  }

  calculateTotals(totalTransactions) {
    var result = 0;

    totalTransactions.forEach((transaction: Transaction) => {
      if (typeof transaction.transactionCredit === 'number')
        this.totalCredit += transaction.transactionCredit;
      if (typeof transaction.transactionDebit === 'number')
        this.TotalDebit += transaction.transactionDebit;
    });
    this.total = this.totalCredit - this.TotalDebit;
  }

  getColor(balance: number): string {
    if (balance === 0) return null;
    return balance > 0 ? 'green' : 'red';
  }

 
  
  addNewHandler() {
    alert('Add new');
  }

  get sortData() {
    return this.transactions.sort((a, b) => {
      return <any>new Date(a.transactionDateTime) - <any>new Date(b.transactionDateTime);
    });
  }

  
  onPrintPreview() {
    let innerContents = document.getElementById("printareaDiv").innerHTML; 
    const popupWinindow = window.open();
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' +
      '<div><h4 style="text-align: center;font-weight: bold"><strong>Heritage United Methodist Church</strong> </h4>' +
      '<h4 style="text-align: center;"font-weight: bold><strong>Troop 425</strong> </h4>' +
      '<h5 style="text-align: center;font-weight: bold">Overland Park, Kansas</h5>' +
      '<h5 style="text-align: center;font-weight: bold">Layne Jones</h5></div><div style="text-align: center"> '
      +   innerContents + '</div></html>');
    popupWinindow.document.write(`<style>
    #transactions {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse:collapse;
      width: 100%;
      border: 1px solid #ddd; 
    }
    
    #transactions td, #transactions th {
      border: none;    
    }
    
    #transactions tbody tr:nth-child(even){background-color: #f2f2f2;}  
    #transactions tbody tr:hover {background-color: #ddd;}
    #transactions th:hover {background-color: rgb(3, 23, 90);}
    
    #transactions th {
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: left;
      background-color: #e8e8e8;
      color: black;
      cursor: pointer;  
    }
    
    #transactions tfoot {
      background-color: #e8e8e8;
    }
    
    </style>
  `);
    popupWinindow.document.close();

    // const printContents = document.getElementById(e).innerHTML
    //   const WindowObject = window.open('','PrintWindow','width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
    //   );
    //   const htmlData = `<html><body>${printContents}</body></html>`;
    
    //   WindowObject.document.writeln(htmlData);
    //   WindowObject.document.close();
    //   WindowObject.focus();
    //   // setTimeout(() => {
    //   //   WindowObject.close();
    //   // }, 0.5);
    };

   printPreview(){
    let printContents = '';
    const WindowObject = window.open('','PrintWindow','width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
     );
     
    printContents += `<table class="table" id="transactions" style="width: 900px;">
                     <tr>
                      <th style="width: 20%;">Type</th>
                <th style="width: 3%;">Ckeck</th>
                <th style="width: 20%;">Activity</th>
                <th style="width: 11%;">Credit</th>
                <th style="width: 11%;">Debit</th>
                <th style="width: 12%;">Date</th>
                     </tr>`;
    // filteredDataAfterDate.map(data => {
    //      printContents += `<tr>
    //                    <td>${data.Date}</td>
    //                    <td>${data.ApplicationStatus}</td> 
    //                    <td>${data.SubmittedBy}</td>
    //                  </tr>`;
    const htmlData = `<html><body>${printContents}</body></html>`;
  
    WindowObject.document.writeln(htmlData);
    WindowObject.document.close();
    WindowObject.focus();
    setTimeout(() => {
      WindowObject.close();
    }, 0.5);
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
  
 
}

