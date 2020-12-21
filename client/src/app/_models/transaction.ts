export interface Transaction {

    transactionId: number;
    transactionTypeId: number;
    transactionType: string;
    activityId: number; 
    activity: string;
    transactionCredit: number;    
    transactionDebit: number;
    checkNumber: number;
    transactionDateTime: Date;
    created: Date;
    reconciliated: boolean;
}