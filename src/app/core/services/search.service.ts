import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${environment.apiUrl}/search`;
const sizeDefault = 12;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchBooksByTitle(key: string, page: number = 1, size: number = sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}/books/byTitle?key=${key}&page=${page}&size=${size}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched books by title=${key}`)),
      catchError(this.handleError<Book[]>('searchBooksByTitle key=${key}'))
    );
  }

  searchBooksByAuthor(key: string, page: number = 1, size: number = sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}/books/byAuthor?key=${key}&page=${page}&size=${size}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched books by author=${key}`)),
      catchError(this.handleError<Book[]>('searchBooksByAuthor key=${key}'))
    );
  }

  searchBooksBySubject(key: string, page: number = 1, size: number = sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}/books/bySubject?key=${key}&page=${page}&size=${size}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched books by subject=${key}`)),
      catchError(this.handleError<Book[]>('searchBooksBySubject key=${key}'))
    );
  }

  searchBooksByTag(key: string, page: number = 1, size: number = sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}/books/byTag?key=${key}&page=${page}&size=${size}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched books by tag=${key}`)),
      catchError(this.handleError<Book[]>('searchBooksByTagName key=${key}'))
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