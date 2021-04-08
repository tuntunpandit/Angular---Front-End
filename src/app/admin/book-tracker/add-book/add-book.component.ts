import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  // @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  constructor(private _fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this._fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      publicationYear: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }


  submitBook() {
    console.log('working', this.bookForm.value);
    if (this.bookForm.valid) {
      const bookData = {
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        publicationYear: this.bookForm.value.publicationYear.year
      }
      this.bookService.addBook(bookData).subscribe(data => {
        console.log('Book Data', data);
        this.bookForm.reset();
        alert(`Book added successfully`);
      })
    }
  }
}
