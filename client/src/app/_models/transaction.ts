export interface Transaction {

    transactionId: number;
    transactionType: number;
    transactionSubType: number;
    transactionFrom: number;
    activityId: number; 
    transactionCredit: number;    
    transactionDebit: number;
    checkNumbe: string;
    transactionDateTime: Date;
    created: Date;
    reconciliated: boolean;
}