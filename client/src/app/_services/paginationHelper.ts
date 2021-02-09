import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MemberParams } from '../_models/memberParams';
import { PaginatedResult } from '../_models/pagination';

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
