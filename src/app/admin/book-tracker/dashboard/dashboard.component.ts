import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Book } from '../../../models/book';
import { Reader } from '../../../models/reader';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { customError } from 'src/app/models/bookTrackerError';

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

  constructor(private _dataS: DataService, private _bookService: BookService, private _router: Router) { }

  ngOnInit() {
    this.getAllData();
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
    // this.allReaders = this._dataS.getAllReaders();
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
