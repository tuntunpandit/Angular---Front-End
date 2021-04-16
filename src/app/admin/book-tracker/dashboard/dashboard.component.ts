import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { Reader } from '../../../models/reader';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { customError } from 'src/app/models/bookTrackerError';
import { ajax } from 'rxjs/ajax';
import { map, filter, concatMap, switchMap, reduce } from 'rxjs/operators';
import { from, fromEvent } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book = {
    _id: '',
    title: '',
    author: '',
    publicationYear: null
  };

  constructor(private _bookService: BookService, private _router: Router) { }

  ngOnInit() {
    this.rxjsFunctions();
    this.getAllData();
  }

  rxjsFunctions() {
    /** ---------------------------------------------------
     ajax operator will make an ajax request for the given URL.
    --------------------------------------------------- **/
    const data = ajax('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(items => items.response),
        // filter(item => item.id > 2)
        // reduce((sum, id) => sum + id, 0)
      );
    data.subscribe(d => {
      console.log('Ajax Data', d);
    })

    /** ---------------------------------------------------
    This operator will create an observable from an array, an array-like object, a promise, an iterable object, or an observable-like object.
    ------------------------------------------------------  **/
    let arr = [1, 2, 3, 4, 5];
    from(arr).subscribe(data => {
      console.log('From Observable:', data);
    })


    const ele = document.getElementById('rxjs');
    console.log('ele', ele);
    let hovEvent = fromEvent(ele, 'click');
    hovEvent.subscribe(data => { 
      console.log('hover data', data);
    })
  }
















  getAllData() {
    this.getAllBooks();
    this.getAllReaders();
  }

  getAllBooks() {
    this._bookService.getAllBooksFromAPi()
      .subscribe(
        (data: Book[]) => {
          this.allBooks = data['books'];
          this.mostPopularBook = this.allBooks[0];
          console.log('bookdata', data);
        },
        (err: customError) => {
          console.log(err.friendlyMessage);
        }
      );
  }

  getAllReaders() {
    this._bookService.getAllReadersFromApi()
      .subscribe(
        (data: Reader[]) => {
          this.allReaders = data['readers'];
          console.log('allReaders', data);
        },
        (err: customError) => {
          console.log(err.friendlyMessage);
        }
      );
  }
  editBook(bookId: number) {
    this._router.navigate(['editbook', bookId]);
  }

  deleteBook(bookId: number) {

  }

  editReader(readerId: number) {
    this._router.navigate(['editreader', readerId]);
  }

  deleteReader(readerId: number) {

  }
}
