import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AppSettings } from 'src/app/configs/app-settings.config';
import { Chip } from 'src/app/shared/models/chip';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${AppSettings.defaultBackendUrl}/authors`;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Chip[]> {
    const url = `${apiUrl}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched authors')),
      catchError(this.handleError<Chip[]>('getauthors'))
    );
  }

  getAuthorById(id: number): Observable<Chip> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched author')),
      catchError(this.handleError<Chip>('getauthorById'))
    );
  }

  getAuthorByName(name: string): Observable<Chip> {
    const url = `${apiUrl}/${name}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched author')),
      catchError(this.handleError<Chip>('getauthorByName'))
    );
  }

  getAuthorsByBookId(bookId: number): Observable<Chip[]> {
    const url = `${apiUrl}/byBookId/${bookId}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched authors')),
      catchError(this.handleError<Chip[]>('getauthorsByBookId'))
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