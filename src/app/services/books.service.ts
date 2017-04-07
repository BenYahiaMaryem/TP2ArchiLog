import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class BooksService {

  constructor(private http: Http) { }

getAllBooks(){
  return this.http.get('/api/books')
            .map(res => res.json());

}
getData(books): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 2000);
    });
  }


getBookById(_id){

return this.http.get('/api/books/'+_id)
            .map(res => res.json());

}

addBook(book){
var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/books", JSON.stringify(book), { headers: headers }) .map(response => response.json());
}

removeBook(book){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  console.log(book);
return this.http.put("/api/books/"+ book._id+"/delete", JSON.stringify(book), { headers: headers }) .map(response => response.json());

}

        


updateBook(book){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
        return this.http.put("/api/books/"+book._id+"/update", JSON.stringify(book), { headers: headers }) .map(response => response.json());

}
}
