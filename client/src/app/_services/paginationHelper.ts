import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
