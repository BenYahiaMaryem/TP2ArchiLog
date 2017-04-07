import { Component, SimpleChange, OnInit,DoCheck } from '@angular/core';
import { NgForm } from "@angular/forms";
//smart table imports 

import {BooksService} from '../../services/books.service';

import { Ng2SmartTableModule, ServerDataSource, Grid } from 'ng2-smart-table';
import { Http } from '@angular/http';



import { CategoriesService } from './../../services/categories.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent {
    grid: Grid
    


    books :any=[]
    categories : any[]


    categoriesBinded: any = []

    settings = {
    columns: {
        _id: {
        title: 'Id'  
        },
        name: {
        title: 'Name'
        },
        author: {
        title: 'Author'
        },
        description: {
        title: 'Description'
        },
        price: {
        title: 'Price'  
        },
        edition: {
        title: 'Edition'  
        },
        editionDate: {
        title: 'Edition Date'  
        },
        image: {
        title: 'Image'  
        },
        categories: {
         title: 'categories',
         type:'html',
         /*valuePrepareFunction:(cell,row)=>{
             //`<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
            return `<select>
              <option   *ngFor="let category of categories">{{ category.name }}</option>

            </select>`
         }*/
         filter: {
            type: 'list',
            config: {
                selectText: 'Select...',
                list: this.categoriesBinded
            },
         },
       }
    },
    actions: {
        add: true,
        edit: true,
        delete: true
    },
   /* Actions: //or something
  {
    title:'Detail',
    type:'html',
    valuePrepareFunction:(cell,row)=>{
      return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
    },
    filter:false       
  },
  */
    add: {
        confirmCreate: true

    },
     delete: {
        confirmDelete: true
    },
     edit: {
        confirmSave: true
    }
    }

    book = {
        _id: 0,
        name : 'book name',
        author : 'auhtor name' ,
        editionDate : 'j/m/y',
        price : 0 ,
        description : ' description',
        edition : 'edition',
        image: 'Insert Image Here',
        isDeleted : 0,
        category: []

    }

    

 

    
    
    /*constructor(private booksService: BooksService, private categoriesService: CategoriesService) {  

        this.booksService.getAllBooks().subscribe(books => {
                this.books = books
                this.source.load(books)
        })
                this.categoriesService.getAllCategories().subscribe(categories => {
                    this.categories = categories
                    this.sourceCatgories.load(categories)

                })
                                    console.log(this.sourceCatgories)

        
    }*/
  
    /////////// from stackoverflow
            getCategories() {
            return this.categoriesService.getAllCategories()
            .do(data => {
            this.categories = data;
            })
            .do(() => {
                /*this.bindCategories()
                console.log(this.categoriesBinded)  // prints the data */
                //this.settings.columns.categories.filter.config.list = this.bindCategories()
                for(let i = 0; i < this.categories.length; i++) {
            //console.log(this.categories[i])
            let cat={
                value :this.categories[i]._id,
                title:this.categories[i].name,
            }
                this.categoriesBinded.push(cat);
                }
            })
            /*.do((data) => {
                console.log(data)
            })*/
            .catch(error => { 
                console.log(error);
                throw error;
            })
        }
     /*   getCategories(): any {
        this.categoriesService.getAllCategories().subscribe(categories => {
                this.categories = categories
                return this.bindCategories(this.categories)
        })
    }*/
    constructor(http: Http, private booksService: BooksService, private categoriesService: CategoriesService){
       // this.source = new ServerDataSource(http, { endPoint: 'http://localhost:3003/api/books' })
       // this.sourceCategories = new ServerDataSource(http, { endPoint: 'http://localhost:3003/api/categories' })
        //console.log(this.source)
        //this.source.getAll
      /* this.getCategories().subscribe(categories => {
                this.categories = categories})
       /*.subscribe(data => {
        console.log(this.categories)
        })*/
    }
    addBook(newData){
            let book = this.book
            book = newData
            book._id = +newData._id
            book.price = +newData.price
            book.isDeleted = 0
            this.booksService.addBook(book)
                .subscribe(data => {
                    console.log('Success' + data)
                   //this.books.push(book);
                })
        }


    /*getBookById(_id){
        var bookG=this.booksService.getBookById(_id)
        .subscribe(data => {
                    console.log('Success getting book by id' + data)
                    
                })
    }*/
    removeBook(_id){
        var bookG=this.booksService.getBookById(_id)
        .subscribe(data => {
                    this.book=data;
                    this.book.isDeleted=1;
                    this.booksService.removeBook(this.book).subscribe (data => {
                    console.log('Success deleting ' + data);
                    
                    })
        })
    }
    updateBook(newData){
        let book = this.book
        book = newData
        console.log(`${book} ken ${newData}`)
        book._id = +newData._id
        book.price = +newData.price
        book.isDeleted = 0
        console.log(`${book} to be updated`)
        this.booksService.updateBook(book)
        .subscribe(data => {
                    console.log('Success updating' + data)
                   // this.books.push(book);
                })
    }
    onCreateConfirm(event): void{
        this.addBook(event.newData)
        //duplicated item show to be deleted
        //this.books.push(event.newData)
       // this.books.push(event.newData)
        //.then()
        ///===> input fields to be removed after inserting
       this.books=this.booksService.getAllBooks().subscribe(books => {
                this.books = books
                
      // this.source.load(this.books)
    })
    }

    onEditConfirm(event): void {
        this.updateBook(event.newData)
        this.books=this.booksService.getAllBooks().subscribe(books => {
                this.books = books
                
       // this.source.load(this.books)
    })
        
    }

    onDeleteConfirm(event): void {
       console.log(event)
       this.removeBook(+event.data._id) 
    }

    
    bindCategories() : any{
        for(let i = 0; i < this.categories.length; i++) {
            console.log(this.categories[i])
            this.categoriesBinded[i] = {
                value : +this.categories[i]._id,
                title : this.categories[i].name
            }
            console.log(this.categoriesBinded[i])
           // this.categoriesBinded[i].value = +this.categories._id
           // this.categoriesBinded[i].title = this.categories.name
        }
        //console.log(this.categoriesBinded)
        //console.log(this.sourceCatgories)
        //return this.categoriesBinded
    }

    }

