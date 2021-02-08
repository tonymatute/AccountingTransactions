
export interface Transaction {
  transactionId: number;
  transactionTypeId?: number;
  activityTypeId?: number;
  transactionCredit?: number;
  transactionDebit?: number;
  checkNumber: string;
  transactionDate: string;
  created: string;
  reconciliated: boolean;
  activityTypeName: string;
  transactionTypeName: string;
  comments: string;
  activityTypeCost: number,
  activityTypeLocation: string
}

