import { HttpClient, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap, reduce, switchMap } from 'rxjs/operators';
import { USE_X_API_TOKEN } from 'src/app/components/http/token';
import { LOKALISE_API_URL } from 'src/constants';

export interface ListAllKeysParams {
  project_id: string;
  branch?: string;
}

export interface LokaliseKey {
  key_id: number;
  created_at: string;
  created_at_timestamp: number;
  key_name: {
    ios: string;
    android: string;
    web: string;
    other: string;
  };
  filenames: {
    ios: string;
    android: string;
    web: string;
    other: string;
  };
  description: string;
  platforms: string[];
  tags: string[];
  is_plural: boolean;
  plural_name: string;
  is_hidden: boolean;
  is_archived: boolean;
  context: string;
  base_words: number;
  char_limit: number;
  custom_attributes: string;
  modified_at: string;
  modified_at_timestamp: number;
  translations_modified_at: string;
  translations_modified_at_timestamp: number;
}

export interface ListAllKeysResponse {
  project_id: string;
  keys: LokaliseKey[];
}

export const useListAllKeys = () => {
  const httpClient = inject(HttpClient);

  const getter = (
    params: ListAllKeysParams & {
      page?: number;
      limit?: number;
    }
  ) =>
    httpClient.get<ListAllKeysResponse>(
      `${LOKALISE_API_URL}/api2/projects/${params.project_id}${
        params.branch ? `:${params.branch}` : ''
      }/keys`,
      {
        observe: 'response',
        params: {
          page: params.page ? params.page.toString() : '1',
          limit: params.limit ? params.limit.toString() : '500',
        },
        context: new HttpContext().set(USE_X_API_TOKEN, true),
      }
    );

  return (params: ListAllKeysParams): Observable<LokaliseKey[]> =>
    getter(params).pipe(
      switchMap((res) => {
        const pageCount = Number(res.headers.get('x-pagination-page-count'));
        const pages = Array.from({ length: pageCount - 1 }, (_, i) => i + 2);
        const keys = res.body!.keys;
        return of(...pages).pipe(
          mergeMap((page) => getter({ ...params, page }), 5),
          reduce((acc, cur) => {
            const pageCount = Number(cur.headers.get('x-pagination-page'));
            cur.body!.keys.forEach((key, index) => {
              acc[(pageCount - 1) * 500 + index] = key;
            });
            return acc;
          }, keys)
        );
      })
    );
};

export interface MultiUpdateParams {
  project_id: string;
  keys: {
    key_id: number;
    tags: string[];
  }[];
}

export const useMultiUpdate = () => {
  const httpClient = inject(HttpClient);

  return (params: MultiUpdateParams) =>
    httpClient.put(
      `${LOKALISE_API_URL}/api2/projects/${params.project_id}/keys`,
      {
        keys: params.keys,
      },
      {
        context: new HttpContext().set(USE_X_API_TOKEN, true),
      }
    );
};
