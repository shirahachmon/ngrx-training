import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksPageActions } from '@book-co/books-page/actions';
import {
  BookModel,
  BookRequiredProps,
} from '@book-co/shared-models';
import { selectActiveBook, selectAllBooks, selectBooksEarningTotals } from '@book-co/shared-state-books';


@Component({
  selector: 'bco-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {

// 3 pieces of data that are changing dynamiclly all over the app.
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | null>;
  total$: Observable<number>;

  constructor(
    private store: Store) {
      this.books$= store.select(selectAllBooks)
      this.currentBook$= store.select(selectActiveBook)
      this.total$= store.select(selectBooksEarningTotals)
    }

  ngOnInit() {
    this.removeSelectedBook();
    this.store.dispatch(BooksPageActions.enter())
  }


  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({bookId: book._id}));
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: BookRequiredProps | BookModel) {

    if ('_id' in book) this.updateBook(book)
    else this.saveBook(book);
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({
      book: bookProps
    }));
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({
      bookId: book._id, changes: book
    }));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({
      bookId: book._id
    }));
  }
}
