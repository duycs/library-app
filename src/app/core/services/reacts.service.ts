import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Comment } from '../../shared/models/comment.model';
import { React } from 'src/app/shared/models/react';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = `${environment.apiUrl}/reacts`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class ReactService {

  constructor(private http: HttpClient) { }

  addOrRemoveReactToBook(react: any): Observable<number> {
    const url = `${apiUrl}/addOrRemoveReactToBook`;
    return this.http.post<number>(url, react, httpOptions).pipe(
      tap(_ => console.log(`added react ${react}`)),
      catchError(this.handleError<number>('addOrRemoveReact'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}