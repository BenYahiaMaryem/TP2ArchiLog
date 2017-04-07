import { Component, OnInit } from '@angular/core';

import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  books :any=[]

  constructor(private booksService: BooksService) {  
        this.booksService.getAllBooks().subscribe(books => {
                this.books = books
        })
  }

  ngOnInit() {
  }

}
