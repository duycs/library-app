import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://poststudy-library.azurewebsites.net/api/v1/search";

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  constructor(private http: HttpClient) { }

  searchBooksByTitle(title: string): Observable<Book[]> {
    const url = `${apiUrl}?title=${title}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log('fetched books by title=${title}')),
      catchError(this.handleError<Book[]>('searchBookByTitles title=${title}'))
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