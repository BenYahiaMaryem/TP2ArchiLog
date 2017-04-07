import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './../books-admin/books.component';

const ROUTES = [
    {
        path: 'books', 
        component: BooksComponent
    }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),// Add routes to the app
  ],
  declarations: []
})
export class StockModule { }
