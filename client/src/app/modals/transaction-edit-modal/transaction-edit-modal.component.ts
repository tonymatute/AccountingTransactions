import { TransactionType } from './../../_models/transactionType';
import { ActivityType } from './../../_models/activityType';
import { Transaction } from './../../_models/transaction';
import { Member } from './../../_models/member';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction-edit-modal',
  templateUrl: './transaction-edit-modal.component.html',
  styleUrls: ['./transaction-edit-modal.component.css']
})
export class TransactionEditModalComponent implements OnInit {
  @Input() editMemberTransaction = new EventEmitter();
  member: Member;
  transaction: Transaction;
  activityTypes: ActivityType[];
  transactionTypes: TransactionType[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  editTransaction() {

    this.editMemberTransaction.emit(this.transaction);
    this.bsModalRef.hide();
  }

}
