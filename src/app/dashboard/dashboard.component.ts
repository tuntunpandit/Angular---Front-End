import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { Book } from '../models/book';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private _dataS: DataService) { }

  ngOnInit() {
    this.allBooks = this._dataS.getAllBooks();
    this.mostPopularBook = this.allBooks[0];
    
    this.allReaders = this._dataS.getAllReaders();
  }

  editBook(bookId: number) {

  }

  deleteBook(bookId: number) {

  }

  editReader(readerId: number) {

  }

  deleteReader(readerId: number) {
    
  }
}
