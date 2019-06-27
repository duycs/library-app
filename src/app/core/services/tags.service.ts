import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { AppSettings } from 'src/app/configs/app-settings.config';
import { Tag } from 'src/app/shared/models/tag';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = `${AppSettings.defaultBackendUrl}/tags`;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    const url = `${apiUrl}`;
    return this.http.get<Tag[]>(url).pipe(
      tap(_ => console.log('fetched tags')),
      catchError(this.handleError<Tag[]>('getTags'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}