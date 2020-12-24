export class SearchParams { 

    lastName: string;
    firstName: string;
    active: boolean;
    patrolId: string;
    pageNumber: number = 1;
    pageSize: number = 12;
    orderBy: string = "Name";

}
