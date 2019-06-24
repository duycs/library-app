import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Member } from 'src/app/shared/models/member';
import { MemberRegister } from 'src/app/shared/models/member-register';
import { CheckoutBookItem } from 'src/app/shared/models/checkout-book-item';
import { RenewBookItem } from 'src/app/shared/models/renew-book-item';
import { ReserveBookItem } from 'src/app/shared/models/reserve-book-item';
import { ReturnBookItem } from 'src/app/shared/models/return-book-item';
import { AppSettings } from 'src/app/configs/app-settings.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = `${AppSettings.defaultBackendUrl}/members`;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  //member services

  getMember(id: number): Observable<Member> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => console.log('fetched member id=${id}')),
      catchError(this.handleError<Member>('getMember id=${id}'))
    );
  }

  register(memberRegister): Observable<MemberRegister> {
    const url = `${apiUrl}/register`;
    return this.http.post<MemberRegister>(url, memberRegister, httpOptions).pipe(
      tap((memberRegister: MemberRegister) => console.log('registered Member w/ id=${book.id}')),
      catchError(this.handleError<MemberRegister>('registerMember'))
    );
  }

  // book item services
  checkoutBook(checkoutBook): Observable<CheckoutBookItem> {
    const url = `${apiUrl}/checkoutBook`;
    return this.http.post<CheckoutBookItem>(url, checkoutBook, httpOptions).pipe(
      tap((checkoutBook: CheckoutBookItem) => console.log('checked out Book w/ id=${book.id}')),
      catchError(this.handleError<CheckoutBookItem>('checkoutBook'))
    );
  }

  renewBook(renewBook): Observable<RenewBookItem> {
    const url = `${apiUrl}/renewBook`;
    return this.http.post<RenewBookItem>(url, renewBook, httpOptions).pipe(
      tap((renewBook: RenewBookItem) => console.log('renew Book w/ id=${book.id}')),
      catchError(this.handleError<RenewBookItem>('renewBook'))
    );
  }


  reserveBook(reserveBook): Observable<ReserveBookItem> {
    const url = `${apiUrl}/reserveBook`;
    return this.http.post<ReserveBookItem>(url, reserveBook, httpOptions).pipe(
      tap((reserveBook: ReserveBookItem) => console.log('reserved Book w/ id=${book.id}')),
      catchError(this.handleError<ReserveBookItem>('reserveBook'))
    );
  }

  returnBook(returnBook): Observable<ReturnBookItem> {
    const url = `${apiUrl}/returnBook`;
    return this.http.post<ReturnBookItem>(url, returnBook, httpOptions).pipe(
      tap((returnBook: ReturnBookItem) => console.log('returned Book w/ id=${book.id}')),
      catchError(this.handleError<ReturnBookItem>('returnBook'))
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