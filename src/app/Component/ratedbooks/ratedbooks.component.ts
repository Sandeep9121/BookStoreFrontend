import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { BookModule } from 'src/app/Model/book/book.module';
import {  MatDialog } from '@angular/material/dialog';
import { BookreviewsComponent } from '../bookreviews/bookreviews.component';


@Component({
  selector: 'app-ratedbooks',
  templateUrl: './ratedbooks.component.html',
  styleUrls: ['./ratedbooks.component.scss']
})
export class RatedbooksComponent implements OnInit {

  bookList = Array<any>();
  totalRate: any;
  color: string;


  constructor(private service: BookService,
    private matSnackBar: MatSnackBar,private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getallApprovedBooks();
    this.totalRate = 5;
    this.getColor();

  }


  getallApprovedBooks() {
    console.log('method called');
    this.service.getallBooks().subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('books:', response.obj);
        this.bookList = response.obj;


        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }

  getColor() {
    if (this.totalRate >= 3 || this.totalRate >= 2) {
      this.color = "rgb(245,182,110)";
    }
    if (this.totalRate >= 4) {
      this.color = "rgb(16,136,16)";
    }
    if (this.totalRate < 2) {
      this.color = "rgb(250,0,0)";
    }
  }

  getReviews(book) {
    const dialogRef = this.dialog.open(BookreviewsComponent, {
      // width: '25rem',
      // panelClass: 'custom-dialog-container',
      // height: '400px',
      // width: '600px',
      data : {bookId:book.bookId}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
