import { MemberType } from './../_enum/memberTypeEnum';

export class MemberParams { 
    lastName: string = "";
    firstName: string = "";
    patrolId: string = "0";
    pageNumber: number = 1;
    pageSize: number = 12;
    orderBy: string = "name";
    memberType: MemberType = 0;
}