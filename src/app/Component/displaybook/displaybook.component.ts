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
  selectedValue = 'relevance';
  orderBy = 'asc';
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
  page = 12;
  length: any = sessionStorage.length;
  pageEvent: PageEvent;
  lengths = 0;
  pageSize = 0;
  CurrentPageNo: 0;
  totalPage: Array<number>;
  data: any;
  reminder: any;
  s: any; selectoption: any;
  value: any = [];
  @Output() output: EventEmitter<any> = new EventEmitter();
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

  onChange(deviceValue) {
    this.selectedValue = deviceValue;
    console.log(' this is tha value of drope down ' + deviceValue);
    switch (this.selectedValue) {
      case 'mod1':
         console.log('vikash kumar1');
         this.approvedBookServiceMethod(this.page, 'price', 'des');
         console.log('Books are from 1  ', this.bookList);
         break;
      case 'mod2':
        this.approvedBookServiceMethod(this.page, 'price', 'asc');
        console.log('Books are from 2  ', this.bookList);
        break;
      case 'mod3':
        this.approvedBookServiceMethod(this.page, 'created_date_and_time', 'asc');
        console.log('Books are from 3  ', this.bookList);
        break;
    }
}

  getallApprovedBooks() {
    this.approvedBookServiceMethod(this.page, 'book_id', 'asc');
  }

  approvedBookServiceMethod(page ?: number, order?: string, sortby?: string) {
    this.service.getAllApprovedBookByPage(page, order, sortby).subscribe((response: any) => {
      console.log(response);
      console.log('Books are the' + response.obj);
      this.bookList = response.obj.content;
      this.size = response.obj.totalElements;
      this.CurrentPageNo = response.obj.pageable.pageNumber;
      this.totalPage = new Array(response.obj.totalPages);
      console.log('Total pages is: ' + this.totalPage);
      console.log('total books are ' + this.size);
      console.log('curret page number is ' + this.CurrentPageNo);
      console.log('Books are  ', this.bookList);
    });
  }


  SetPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log('page number you want is' + i);
    this.getallApprovedBooks();
  }

  modo(value: string) {
  }

  sortingl() {
    this.data = true;
    this.service.sorting(this.data).subscribe( response => {
      this.boo = response.bookList;
      this.obj = response.bookList;
      console.log(this.boo, 'booklist');
      return this.boo;
    });
    this.getSearchBookData();
  }
  sortingh() {
    this.data = false;
    this.service.sorting(this.data).subscribe( response => {
      this.boo = response.bookList;
      this.obj = response.bookList;
      console.log(this.boo, 'booklist');
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
  }

  getUpdatedNotes(event) {
    this.ngOnInit();
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
