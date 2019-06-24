import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { BookItem } from 'src/app/shared/models/book-item';
import { AppSettings } from 'src/app/configs/app-settings.config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${AppSettings.defaultBackendUrl}/books`;

@Injectable({
  providedIn: 'root'
})
export class ApiBookService {

  constructor(private http: HttpClient) { }

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl)
      .pipe(
        tap(books => console.log('Fetch Books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  getBooksRecommended (): Observable<Book[]> {
    const url = `${apiUrl}/recommended`;
    return this.http.get<Book[]>(apiUrl)
      .pipe(
        tap(books => console.log('Fetch Books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log('fetched book id=${id}')),
      catchError(this.handleError<Book>('getBook id=${id}'))
    );
  }

  addBook (book): Observable<Book> {
    return this.http.post<Book>(apiUrl, book, httpOptions).pipe(
      tap((book: Book) => console.log('added book w/ id=${book.id}')),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook (id, book): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, book, httpOptions).pipe(
      tap(_ => console.log('updated book id=${id}')),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(id): Observable<Book> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => console.log('deleted book id=${id}')),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  getBookItemByBookId(bookId: number): Observable<BookItem> {
    const url = `${apiUrl}/bookItem/${bookId}`;
    return this.http.get<BookItem>(url).pipe(
      tap(_ => console.log('fetched bookItem bookId=${bookId}')),
      catchError(this.handleError<BookItem>('getBookItemByBookId bookId=${bookId}'))
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