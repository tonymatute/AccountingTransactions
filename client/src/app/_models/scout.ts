import { Rank } from './rank';
import { BuckTransaction } from "./buckTransactions";
import { Parent } from "./parent";
import { Transaction } from "./transaction";

export interface Scout {

    memberId: number;
    lastName: string;
    firstName: string;
    age: number;
    rechartedDate: Date;
    active: boolean;
    activeSinceDatetime: Date;
    photoUrl: string;
    publicId?: string;
    rankName: string;
    patrolId: number;
    patrolName: string;
    created: Date;
    transactions: Transaction[];
    buckTransactions: BuckTransaction[];
    parents: Parent[];
    ranks: Rank[];

}