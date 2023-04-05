import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Chip } from 'src/app/shared/models/chip';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${environment.apiUrl}/Subjects`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(page: number = 1, size: number = sizeDefault): Observable<Chip[]> {
    const url = `${apiUrl}?page=${page}&size=${size}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched Subjects')),
      catchError(this.handleError<Chip[]>('getSubjects'))
    );
  }

  getSubjectById(id: number): Observable<Chip> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched subject')),
      catchError(this.handleError<Chip>('getSubjectById'))
    );
  }

  getSubjectByName(name: string): Observable<Chip> {
    const url = `${apiUrl}/${name}`;
    return this.http.get<Chip>(url).pipe(
      tap(_ => console.log('fetched subject')),
      catchError(this.handleError<Chip>('getSubjectByName'))
    );
  }

  getSubjectsByBookId(bookId: number, page: number = 1, size: number = sizeDefault): Observable<Chip[]> {
    const url = `${apiUrl}/byBookId/${bookId}?page=${page}&size=${size}`;
    return this.http.get<Chip[]>(url).pipe(
      tap(_ => console.log('fetched Subjects')),
      catchError(this.handleError<Chip[]>('getSubjectsByBookId'))
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