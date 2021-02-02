import { ScoutRank } from './scoutRank';
import { Rank } from './rank';


import { Transaction } from "./transaction";
import { Adult } from './adult';

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
}