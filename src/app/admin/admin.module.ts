import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './book-tracker/dashboard/dashboard.component';
import { AddBookComponent } from './book-tracker/add-book/add-book.component';
import { AddReaderComponent } from './book-tracker/add-reader/add-reader.component';
import { EditBookComponent } from './book-tracker/edit-book/edit-book.component';
import { EditReaderComponent } from './book-tracker/edit-reader/edit-reader.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'addbook',
        component: AddBookComponent
      },
      {
        path: 'addreader',
        component: AddReaderComponent
      },
      {
        path: 'editbook/:id',
        component: EditBookComponent
      },
      {
        path: 'editreader/:id',
        component: EditReaderComponent
      },
    ]
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    AddBookComponent,
    AddReaderComponent,
    EditBookComponent,
    EditReaderComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
