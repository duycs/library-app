import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { BookItem } from '../../shared/models/book-item';
import { RemoveObjectById } from 'src/app/shared/models/remove-object-id';
import { Member } from 'src/app/shared/models/member';
import { BlockMember } from 'src/app/shared/models/block-member';
import { UnblockMember } from 'src/app/shared/models/unblock-member';
import { LibrarianRegister } from 'src/app/shared/models/librarian-register';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = `${environment.apiUrl}/librarians`;
const sizeDefault = 10;

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private http: HttpClient) { }

  //register
  register (librarianRegister: any): Observable<LibrarianRegister> {
    const url = `${apiUrl}/register`;
    return this.http.post<LibrarianRegister>(url, librarianRegister, httpOptions).pipe(
      tap((librarianRegister: LibrarianRegister) => console.log('Librarian registerted')),
      catchError(this.handleError<LibrarianRegister>('LibrarianRegister'))
    );
  }

  // book management services
  
  findBooks (page:number=1, size=sizeDefault): Observable<Book[]> {
    const url = `${apiUrl}/findBooks?page=${page}&size=${size}`;
    return this.http.get<Book[]>(url)
      .pipe(
        tap(books => console.log('Fetch Books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  findBook(id: number): Observable<Book> {
    const url = `${apiUrl}/findBook/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log('fetched book id=${id}')),
      catchError(this.handleError<Book>('getBook id=${id}'))
    );
  }

  addBook (book: any): Observable<Book> {
    const url = `${apiUrl}/addBook`;
    return this.http.post<Book>(url, book, httpOptions).pipe(
      tap((book: Book) => console.log('added book')),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook (book: any): Observable<any> {
    const url = `${apiUrl}/updateBook`;
    return this.http.put(url, book, httpOptions).pipe(
      tap(_ => console.log('updated book')),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  removeBook(removeObjectById: any): Observable<RemoveObjectById> {
    const url = `${apiUrl}/removeBook`;
    return this.http.delete(url, removeObjectById).pipe(
      tap(_ => console.log('removed book')),
      catchError(this.handleError<any>('removeBook'))
    );
  }

  //book item management services
  findBookItems (page:number=1, size:number=sizeDefault): Observable<BookItem[]> {
    const url = `${apiUrl}/findBookItems?page=${page}&size=${size}`;
    return this.http.get<BookItem[]>(url)
      .pipe(
        tap(books => console.log('Fetch Book items')),
        catchError(this.handleError('getBookItems', []))
      );
  }

  findBookItem(id: number): Observable<BookItem> {
    const url = `${apiUrl}/findBookItem/${id}`;
    return this.http.get<BookItem>(url).pipe(
      tap(_ => console.log('fetched book item id=${id}')),
      catchError(this.handleError<BookItem>('getBookItem id=${id}'))
    );
  }

  addBookItem (bookItem: any): Observable<BookItem> {
    const url = `${apiUrl}/addBookItem`;
    return this.http.post<BookItem>(url, bookItem, httpOptions).pipe(
      tap((bookItem: BookItem) => console.log('added book item')),
      catchError(this.handleError<BookItem>('addBookItem'))
    );
  }

  updateBookItem (bookItem: any): Observable<any> {
    const url = `${apiUrl}/updateBookItem`;
    return this.http.put(url, bookItem, httpOptions).pipe(
      tap(_ => console.log('updated book item')),
      catchError(this.handleError<any>('updateBookItem'))
    );
  }

  removeBookItem(removeObjectById: any): Observable<any> {
    const url = `${apiUrl}/removeBookItem`;
    return this.http.delete(url, removeObjectById).pipe(
      tap(_ => console.log('removed book item')),
      catchError(this.handleError<any>('removeBookItem'))
    );
  }

  // member management services
  findMembers (page:number=1, size:number=sizeDefault): Observable<Member[]> {
    const url = `${apiUrl}/findMembers?page=${page}&size=${size}`;
    return this.http.get<Member[]>(url)
      .pipe(
        tap(books => console.log('Fetch Members')),
        catchError(this.handleError('getMembers', []))
      );
  }

  findMember(email: number): Observable<Member> {
    const url = `${apiUrl}/findMember?email=${email}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => console.log('fetched member email=${email}')),
      catchError(this.handleError<Member>('getMember email=${email}'))
    );
  }

  blockMember (blockMember: any): Observable<BlockMember> {
    const url = `${apiUrl}/blockMember`;
    console.log(blockMember);
    return this.http.put(url, blockMember, httpOptions).pipe(
      tap((i: any) => console.log('blocked member')),
      catchError(this.handleError<any>('blockMember'))
    );
  }

  unblockMember (unblockMember: any): Observable<UnblockMember> {
    const url = `${apiUrl}/unblockMember`;
    return this.http.put(url, unblockMember, httpOptions).pipe(
      tap((i: any) => console.log('unblocked member')),
      catchError(this.handleError<any>('unblockMember'))
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