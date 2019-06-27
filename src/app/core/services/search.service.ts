import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { AppSettings } from 'src/app/configs/app-settings.config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = `${AppSettings.defaultBackendUrl}/search`;

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  constructor(private http: HttpClient) { }

  searchBooksByTitle(key: string): Observable<Book[]> {
    const url = `${apiUrl}/books/byTitle?key=${key}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log('fetched books by key=${key}')),
      catchError(this.handleError<Book[]>('searchBooksByTitle key=${key}'))
    );
  }

  searchBooksByAuthor(key: string): Observable<Book[]> {
    const url = `${apiUrl}/books/byAuthor?key=${key}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log('fetched books by key=${key}')),
      catchError(this.handleError<Book[]>('searchBooksByAuthor key=${key}'))
    );
  }

  searchBooksBySubject(key: string): Observable<Book[]> {
    const url = `${apiUrl}/books/bySubject?key=${key}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log('fetched books by key=${key}')),
      catchError(this.handleError<Book[]>('searchBooksBySubject key=${key}'))
    );
  }

  searchBooksByTagName(key: string): Observable<Book[]> {
    const url = `${apiUrl}/books/byTagName?key=${key}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log('fetched books by key=${key}')),
      catchError(this.handleError<Book[]>('searchBooksByTagName key=${key}'))
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