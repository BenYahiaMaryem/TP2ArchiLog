import { BooksComponent } from './books-admin/books.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
//smart table
import { Ng2SmartTableModule } from 'ng2-smart-table';

const ROUTES = [
    {
        path: 'books', 
        component: BooksComponent
    }
]

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    RouterModule.forChild(ROUTES)// Add routes to the app
  ],
  declarations: [
    AdminHeaderComponent,
    FooterComponent,
    BooksComponent
    ],
  exports: [
    AdminHeaderComponent,
    FooterComponent,
    BooksComponent
  ]
})
export class AdminModule { }
