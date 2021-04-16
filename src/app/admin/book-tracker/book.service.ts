import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { customError } from 'src/app/models/bookTrackerError';
import { Reader } from 'src/app/models/reader';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient, private _route: Router, private _activatedRoute: ActivatedRoute) { }

  // add book
  addBook(bookData: Partial<Book>) {
    return this._http.post('/api/addBook', bookData).pipe(
      catchError(err => {
        alert(err.message);
        return EMPTY;
      }));
  }
  // get all books
  getAllBooksFromAPi(): Observable<Book[] | customError> {
    return this._http.get<Book[]>('/api/getBooks')
      .pipe(
        catchError(this.handleError)
      )
  }
  //get book by id
  // getBookDataById(bookId: string): Observable<Book | customError> {
  //   return this._http.get<Book>('api/getReaderById', bookId)
  //     .pipe(
  //       catchError(err => {
  //         alert(err.message);
  //         return EMPTY;
  //       })
  //     )
  // }
  // add reader
  addReader(readerData: Partial<Reader>) {
    return this._http.post('/api/addReader', readerData).pipe(
      catchError(err => {
        alert(err.message);
        return EMPTY;
      }));
  }
  // get all readers
  getAllReadersFromApi(): Observable<Reader[] | customError> {
    return this._http.get<Reader[]>('/api/getReaders')
      .pipe(
        catchError(this.handleError)
      )
  }
  // get reader by id
  // getReaderDataById(readerId: string): Observable<Reader | customError> {
  //   return this._http.get<Reader>('api/updateReader', readerId)
  //     .pipe(
  //       catchError(err => {
  //         alert(err.message);
  //         return EMPTY;
  //       })
  //     )
  // }
  //handle http errors
  private handleError(error: HttpErrorResponse): Observable<customError> {
    let dataError = new customError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error occured retrieving data.";
    return throwError(dataError);
  }


}
