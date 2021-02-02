import { Transaction } from "./transaction";

export interface Member {
  memberId: number;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  gender: string;
  scout: boolean;
  currentPosition: string;
  currentRank: string;
  photo: string;
  patrol: string;
  patrolId: number;
  troopNumber: number;
  age: number;
  rechartedDate?: Date;
  transactions: Transaction[];
}
