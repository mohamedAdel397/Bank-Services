/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getHello } from '../fn/demo-controller/get-hello';
import { GetHello$Params } from '../fn/demo-controller/get-hello';

@Injectable({ providedIn: 'root' })
export class DemoControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getHello()` */
  static readonly GetHelloPath = '/api/v1/demo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHello()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello$Response(params?: GetHello$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getHello(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getHello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello(params?: GetHello$Params, context?: HttpContext): Observable<string> {
    return this.getHello$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
