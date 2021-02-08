import { MemberAddModalComponent } from './../modals/member-add-modal/member-add-modal.component';
import { ActivityType } from './../_models/activityType';
import { TransactionType } from './../_models/transactionType';
import { GridtService } from './../_services/grid.service';
import { MemberService } from './../_services/member.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Member } from './../_models/member';
import { Transaction } from './../_models/transaction';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  @Input() member: Member;
  transactions: Transaction[];
  transactionTypes: TransactionType[];
  activityTypes: ActivityType[];
  totalCredit: number = 0;
  TotalDebit: number = 0;
  total: number = 0;
  public page: number = 1;

  bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private memberService: MemberService,
    private gridService: GridtService
  ) {}

  ngOnInit(): void {
    this.transactions = this.member.transactions;
    this.gridService.loadSortableScripts();
    this.transactions = this.sortData;
    this.calculateTotals(this.transactions);
    this.getActivityTypes();
    this.getTransactionTypes();
  }

  calculateTotals(totalTransactions) {
    var result = 0;

    totalTransactions.forEach((transaction: Transaction) => {
      if (typeof transaction.transactionCredit === 'number')
        this.totalCredit += transaction.transactionCredit;
      if (typeof transaction.transactionDebit === 'number')
        this.TotalDebit += transaction.transactionDebit * -1;
    });
    this.total = this.totalCredit - this.TotalDebit * -1;
  }

  getColor(balance: number): string {
    if (balance === 0) return null;
    return balance > 0 ? 'green' : 'red';
  }

  openMemberAddModal(member: Member) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        member,
        activityTypes: this.activityTypeToArray(),
        transactionTypes: this.transactionTypeToArray(),
      },
    };
    this.bsModalRef = this.modalService.show(MemberAddModalComponent, config);
    this.bsModalRef.content.addMemberTransaction.subscribe((values) => {
      const newTransaction = {
        transaction: values,
      };
      if (newTransaction) {
        this.memberService
          .addTransactionk(member.memberId, newTransaction.transaction)
          .subscribe(() => {
            member.transactions.push(newTransaction.transaction);
            member.transactions = this.gridService.sorTransactionsByDateDesc(
              member.transactions
            );
            window.location.reload();
          });
      }
    });
  }

  getActivityTypes() {
    this.memberService.getActivityTypes().subscribe((activityTypes) => {
      this.activityTypes = activityTypes;
    });
  }

  getTransactionTypes() {
    this.memberService.getTransactionTypes().subscribe((transactionTypes) => {
      this.transactionTypes = transactionTypes;
    });
  }

  get sortData() {
    return this.transactions.sort((a, b) => {
      return (
        <any>new Date(a.transactionDate) - <any>new Date(b.transactionDate)
      );
    });
  }

  private transactionTypeToArray() {
    const transactionTypeArray = [];

    this.transactionTypes.forEach((transactionType) => {
      transactionTypeArray.push(transactionType);
    });
    return transactionTypeArray;
  }

  private activityTypeToArray() {
    const activityTypeArray = [];

    this.activityTypes.forEach((activityType) => {
      activityTypeArray.push(activityType);
    });
    return activityTypeArray;
  }
}
