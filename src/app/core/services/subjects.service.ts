import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AppSettings } from 'src/app/configs/app-settings.config';
import { Chip } from 'src/app/shared/models/chip';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${AppSettings.defaultBackendUrl}/Subjects`;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Chip[]> {
    const url = `${apiUrl}`;
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

  getSubjectsByBookId(bookId: number): Observable<Chip[]> {
    const url = `${apiUrl}/byBookId/${bookId}`;
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