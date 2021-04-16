import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Reader } from 'src/app/models/reader';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.scss']
})
export class EditReaderComponent implements OnInit {
  readerId: string;
  readerForm: FormGroup;
  constructor(private _fb: FormBuilder, private bookService: BookService, private activatedRoute: ActivatedRoute) {
    this.readerForm = this._fb.group({
      name: [null, Validators.required],
      weeklyReadingGoal: [null, Validators.required],
      totalMinutesRead: [null, Validators.required],
    });
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('Reader id', params.get('id'));
      this.readerId = params.get('id');
    });

    // this.bookService.getReaderDataById(this.readerId)
    //   .subscribe(
    //     (res: Reader) => {
    //       console.log("Reader by id", res);
    //     }
    //   )
  }

  updateReader() {
    console.log('working update Reader', this.readerForm.value);
    // if (this.readerForm.valid) {
    //   this.bookService.updateReader(this.readerForm.value).subscribe(data => {
    //     console.log('reader Data', data);
    //     this.readerForm.reset();
    //     alert(`reader added successfully`);
    //   })
    // }
  }
}
