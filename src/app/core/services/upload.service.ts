import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

const apiUrl = `${environment.apiUrl}/Upload`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImageToS3(formData: any) {
    const url = `${apiUrl}/UploadImageToS3`;
    return this.http.post<any>(url, formData).pipe(
      tap(_ => console.log('uploaded')),
      catchError(this.handleError<any>('eror'))
    );
  }

  uploadEbookToS3(formData: any) {
    const url = `${apiUrl}/UploadEbookToS3`;
    return this.http.post<any>(url, formData).pipe(
      tap(_ => console.log('uploaded')),
      catchError(this.handleError<any>('eror'))
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