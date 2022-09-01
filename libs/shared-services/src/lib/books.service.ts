import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { BookModel, BookRequiredProps } from '@book-co/shared-models';
import { Observable } from 'rxjs';
import { WebRequestsService } from './web-requests.service';

const BASE_URL = 'http://localhost:3000/books';
const HEADER = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient,
    private webReqService: WebRequestsService) {}

    // Work
  load(id: string) {
    return this.http.get<BookModel>(`${BASE_URL}/${id}`);
  }

  // Work.
    all() :Observable<any>{
    return this.webReqService.get('books');
  }

  // Work.
  create(bookProps: BookRequiredProps): Observable<any>{
    return this.webReqService.post('books', { bookProps })
  }

  update(id: string, updates: BookRequiredProps): Observable<any>{
    return this.webReqService.patch(`books/${id}`, { updates })
  }

  // Work.
  delete(id: string){
    return this.webReqService.delete(`books/${id}`)
  }





  // Creating one book.
  // Working good
  // create(bookProps: BookRequiredProps) {
  //   const Book: BookModel = {
  //     _id: uuid.v4(),
  //     ...bookProps,
  //   };

  //   return this.http.post<BookModel>(
  //     `${BASE_URL}`,
  //     JSON.stringify(Book),
  //     HEADER
  //   );
  // }

  // // Not working for now.
  // update(id: string, updates: BookRequiredProps) {
  //   return this.http.patch<BookModel>(
  //     `${BASE_URL}/${id}`,
  //     JSON.stringify(updates),
  //     HEADER
  //   );
  // }

  // // Not working for now.
  // delete(id: string) {
  //   return this.http.delete(`${BASE_URL}/${id}`);
  // }

}
