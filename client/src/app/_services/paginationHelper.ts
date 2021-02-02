import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdultParams } from '../_models/adultParams';
import { MemberParams } from '../_models/memberParams';
import { PaginatedResult } from '../_models/pagination';
import { ScoutParams } from '../_models/scoutParams';

export function getPaginationHeaders(scoutParams: ScoutParams) {
  let params = new HttpParams();

  params = params.append('pageNumber', scoutParams.pageNumber.toString());
  params = params.append('pageSize', scoutParams.pageSize.toString());
  params = params.append('active', scoutParams.active.toString());
  params = params.append('orderBy', scoutParams.orderBy);
  params = params.append('lastName', scoutParams.lastName);
  params = params.append('firstName', scoutParams.firstName);
  params = params.append('patrolId', scoutParams.patrolId.toString());

  return params;
}

export function getMemberPaginationHeaders(memberParams: MemberParams) {
  let params = new HttpParams();

  params = params.append('pageNumber', memberParams.pageNumber.toString());
  params = params.append('pageSize', memberParams.pageSize.toString());
  params = params.append('orderBy', memberParams.orderBy);
  params = params.append('lastName', memberParams.lastName);
  params = params.append('firstName', memberParams.firstName);
  params = params.append('MemberType', memberParams.memberType.toString());
  params = params.append('patrolId', memberParams.patrolId.toString());

  return params;
}

export function getAdultPaginationHeaders(adultParams: AdultParams) {
  let params = new HttpParams();

  params = params.append('pageNumber', adultParams.pageNumber.toString());
  params = params.append('pageSize', adultParams.pageSize.toString());
  params = params.append('active', adultParams.active.toString());
  params = params.append('orderBy', adultParams.orderBy);
  params = params.append('lastName', adultParams.lastName);
  params = params.append('firstName', adultParams.firstName);

  return params;
}

export function getPaginationResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  return http
    .get<T>(url, { observe: 'response', params })
    .pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }
        return paginatedResult;
      })
    );
}
