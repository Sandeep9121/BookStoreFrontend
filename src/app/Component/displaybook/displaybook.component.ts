import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { BookModule } from 'src/app/Model/book/book.module';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-displaybook',
  templateUrl: './displaybook.component.html',
  styleUrls: ['./displaybook.component.scss']
})
export class DisplaybookComponent implements OnInit {


  boo: any;
  bookList = [];
  book: BookModule = new BookModule();
  items = [];
  pageofItems: Array<BookModule> = new Array<BookModule>();
  obj: BookModule[];
  size: number;
  // tslint:disable-next-line: variable-name
  book_id: number;
  bookSearch: any;
  bookName: string;
  length: any = sessionStorage.length;
  pageEvent: PageEvent;
  lengths = 24;
  pageSize = 8;
  data: any;
  reminder: any;
  s: any; selectoption: any;
  value: any = [];
  // @Output() output : EventEmitter<any> = new EventEmitter();
leng: any;
  constructor( private service: BookService, private snakbar: MatSnackBar) { }

  ngOnInit() {
    this.getallApprovedBooks();
    this.leng = sessionStorage.length;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      console.log('key ::' + key);
    }
    console.log(this.value);
  }

  getallApprovedBooks() {
    this.service.getAllApprovedBook().subscribe((response: any) => {
      console.log(response);
      console.log('Books are the' + response.obj);
      this.bookList = response.obj;
      this.size = this.bookList.length;
      console.log('total books are ' + this.size);
      console.log('Books are  ', this.bookList);
    });
  }

  modo(value: string) {
    switch (value) {
      case 'mod1':
         this.sortingl();
         break;
      case 'mod2':
         this.sortingh();
         break;
      case 'mod3':
         this.SortNewestArrival();
         break;
    }
  }

  sortingl() {
    this.data = true;
    this.service.sorting(this.data).subscribe( response => {
      this.boo = response.bookList;
      this.obj = response.bookList;
    //  this.size = response.bookList.length;
    //  this.pageofItems = response.bookList;
      console.log(this.boo, 'booklist');
   // console.log("Books ::::"+this.book);

      return this.boo;
    });
    this.getSearchBookData();
  }
  sortingh() {
    this.data = false;
    this.service.sorting(this.data).subscribe( response => {
      this.boo = response.bookList;
      this.obj = response.bookList;
    //  this.size = response.bookList.length;
    //  this.pageofItems = response.bookList;
      console.log(this.boo, 'booklist');
   // console.log("Books ::::"+this.book);

      return this.boo;
    });
    this.getSearchBookData();
  }

  addtobag( bookId: any) {
  sessionStorage.setItem(bookId, bookId);
  this.getOutput();
  this.ngOnInit();
}

getData(event?: PageEvent) {
  console.log(' event:::' + event.pageIndex);
  this.service.getPagination(event.pageIndex).subscribe( result => {
                 this.boo = result.bookList;
                 this.size = result.bookList.length;
                 console.log(' data:::' + result.bookList);
                });
  this.getSearchBookData();
  return event;
}

getOutput() {
    // this.output.emit("ok");
  }

  getUpdatedNotes(event) {
    this.ngOnInit();
    }

onChangePage( pageofItems: Array<any>) {
 this.pageofItems = pageofItems;
}
getSearchBookData() {
  this.service.getSearchBookData().subscribe((message) => {
    console.log('search data', message.books);
    this.bookSearch = message.books;
  });


}
SortNewestArrival() {
  this.service.SortNewestArrival().subscribe((response: any) => {
    this.boo = response.bookList;
    console.log(this.boo, 'booklist');
    this.obj = response.bookList;
  });
  this.getSearchBookData();
}

}
