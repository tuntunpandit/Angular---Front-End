import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string;
  constructor(private _fb: FormBuilder, private bookService: BookService, private activatedRoute: ActivatedRoute) {
    this.bookForm = this._fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      publicationYear: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.bookId = params.get('id');
    });

    this.bookService.getBookDataById(this.bookId)
      .subscribe((bookData: Book) => {
        console.log('Book Data', bookData);
        // this.bookForm =
      })
  }

  updateBook() {
    // console.log('working update book', this.bookForm.value);
    // if (this.bookForm.valid) {
    //   const bookData = {
    //     title: this.bookForm.value.title,
    //     author: this.bookForm.value.author,
    //     publicationYear: this.bookForm.value.publicationYear.year
    //   }
    //   this.bookService.addBook(bookData).subscribe(data => {
    //     console.log('Book Data', data);
    //     this.bookForm.reset();
    //     alert(`Book added successfully`);
    //   })
    // }
  }

}
