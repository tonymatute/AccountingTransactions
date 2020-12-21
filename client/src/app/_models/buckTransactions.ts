export interface BuckTransaction {
  transactionId: number;
  transactionTypeId: number;
  transactionType: string;
  activityId: number;
  activity: string;
  transactionCredit: number;
  transactionDebit: number;
  transactionDateTime: Date;
  created: Date;
}
