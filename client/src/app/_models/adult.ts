import { AdultLeadership } from './adultLeadership';
import { Transaction } from './transaction';

export interface Adult {
  adultId: number;
  lastName: string;
  firstName: string;
  rechartedDate: Date;
  active: boolean;
  activeSinceDatetime: Date;
  photoUrl?: any;
  publicId?: any;
  created: Date;
  transactions: Transaction[];
  adultLeaderships: AdultLeadership[];
}
