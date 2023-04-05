import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Comment } from '../../shared/models/comment.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = `${environment.apiUrl}/comments`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByBookId(bookId: number, page: number = 1, size: number = sizeDefault): Observable<Comment[]> {
    const url = `${apiUrl}/findByBookId/${bookId}?page=${page}&size=${size}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(books => console.log('Fetch Comments')),
        catchError(this.handleError('getCommentsByBookId', []))
      );
  }

  addComment(comment: any): Observable<Comment> {
    const url = `${apiUrl}/addComment`;
    return this.http.post<Comment>(url, comment, httpOptions).pipe(
      tap((comment: Comment) => console.log('added comment w/ id=${comment.id}')),
      catchError(this.handleError<Comment>('addComment'))
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