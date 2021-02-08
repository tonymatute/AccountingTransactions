import { NewTransaction } from './../../_models/newTransaction';
import { TransactionType } from './../../_models/transactionType';
import { ActivityType } from './../../_models/activityType';
import { Transaction } from './../../_models/transaction';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-add-modal',
  templateUrl: './member-add-modal.component.html',
  styleUrls: ['./member-add-modal.component.css']
})
export class MemberAddModalComponent implements OnInit {
  @Input() addMemberTransaction = new EventEmitter();
  member: Member;
  transaction: NewTransaction = {
    transactionTypeId: "", activityTypeId: "", transactionCredit: "" , transactionDebit: "",
    checkNumber: '', transactionDate: '', comments: ''
  }
  activityTypes: ActivityType[];
  transactionTypes: TransactionType[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  addTransaction() {

    this.addMemberTransaction.emit(this.transaction);
    this.bsModalRef.hide();
  }

}
