import { BooksComponent } from './books-admin/books.component';
import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './header/header.component';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  title = 'admin works!';
}
