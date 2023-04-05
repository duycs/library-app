import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { Tag } from 'src/app/shared/models/tag';
import { Chip } from 'src/app/shared/models/chip';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${environment.apiUrl}/tags`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(page: number = 1, size: number = sizeDefault): Observable<Chip[]> {
    const url = `${apiUrl}?page=${page}&size=${size}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched tags')),
      catchError(this.handleError<Chip[]>('getTags'))
    );
  }

  getTagById(id: number): Observable<Chip> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched tag')),
      catchError(this.handleError<Chip>('getTagById'))
    );
  }

  getTagByName(name: string): Observable<Chip> {
    const url = `${apiUrl}/${name}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched tag')),
      catchError(this.handleError<Chip>('getTagByName'))
    );
  }

  getTagsByBookId(bookId: number, page: number = 1, size: number = sizeDefault): Observable<Chip[]> {
    const url = `${apiUrl}/byBookId/${bookId}?page=${page}&size=${size}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched tags')),
      catchError(this.handleError<Chip[]>('getTagsByBookId'))
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