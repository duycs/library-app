import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book';
import { ApiBookService } from './books.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const apiExportFromPoststudyUrl = "http://localhost:5001/api/exportBook";

@Injectable({
    providedIn: 'root'
})
export class ApiImportBookService {
    data: Book[] = [];
    constructor(private http: HttpClient, private apiBookService: ApiBookService) { }

    getExportFromPoststudyBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(apiExportFromPoststudyUrl)
            .pipe(
                tap(books => console.log('Fetch Books from Posts study')),
                catchError(this.handleError('getExportFromPoststudyBooks', []))
            );
    }

    importBooks() {
        this.getExportFromPoststudyBooks().subscribe(res => {
            this.data = res;
            console.log(this.data);
            this.data.forEach(element => {
                this.apiBookService.addBook(element)
            });
        }, err => {
            console.log(err);
        });
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

export interface PostsBook {
    id: number;
    acceptedAnswerId: number;
    answerCount: number;
    bodyContent: string;
    creationDate: Date;
    comments: string;
    commentCount: number;
    closeDate: Date;
    communityOwnedDate: Date;
    coverImg: string;
    description: string;
    deletionDate: Date;
    ownerUserId: number;
    postTypeId: number;
    parentId: number;
    relatedPosts: string;
    score: number;
    htmlContent: string;
    headContent: string;
    tags: string;
    title: string;
    tableContent: string;
    userDisplayName: string;
    userAvatar: string;
    lastActivityDate: Date;
    lastEditDate: Date;
    lastEditorUserId: number;
    voteCount: number;
    viewCount: number;
    //answer??
}