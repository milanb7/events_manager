import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators/catchError';
import {retry} from 'rxjs/operators/retry';
import {environment} from '../../../environments/environment';
import {EventModel} from '../model/events.model';


@Injectable()
export class ConfigService {
  readonly configUrl = environment.api;

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get<EventModel>(this.configUrl).pipe(
      retry(2),
      catchError(this.handleError)
    ).delay(700);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return Observable.throw('Something bad happened, please try again later.');
  }

}
