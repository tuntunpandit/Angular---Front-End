import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss']
})
export class AddReaderComponent implements OnInit {
  readerForm: FormGroup;
  constructor(private _fb: FormBuilder, private bookService: BookService) {
    this.readerForm = this._fb.group({
      name: [null, Validators.required],
      weeklyReadingGoal: [null, Validators.required],
      totalMinutesRead: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }


  submitReader() {
    console.log('working', this.readerForm.value);
    if (this.readerForm.valid) {
      this.bookService.addReader(this.readerForm.value).subscribe(data => {
        console.log('reader Data', data);
        this.readerForm.reset();
        alert(`reader added successfully`);
      })
    }
  }
}
