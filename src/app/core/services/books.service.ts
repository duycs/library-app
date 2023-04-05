import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { BookItem } from 'src/app/shared/models/book-item';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = `${environment.apiUrl}/books`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, size: number = sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}?page=${page}&size=${size}`;
    return this.http.get<Book[]>(url)
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

  addBook(book: any): Observable<Book> {
    return this.http.post<Book>(apiUrl, book, httpOptions).pipe(
      tap((book: Book) => console.log('added book w/ id=${book.id}')),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(id: any, book: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, book, httpOptions).pipe(
      tap(_ => console.log('updated book id=${id}')),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(id: any): Observable<Book> {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}