import { Pipe, PipeTransform } from '@angular/core';
import { BookModule } from '../Model/book/book.module';

@Pipe({
  name: 'booksearchpipe'
})
export class BooksearchpipePipe implements PipeTransform {

  transform(boo: BookModule[], searchTerm: string){
    if (!boo || !searchTerm)
    {
      return boo;
    }
    else
    {
      return boo.filter(book =>
        {
            if (searchTerm && book.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
                return true;
            }
            if (searchTerm && book.authorName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
                return true;
            }
            if (searchTerm && book.status.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
                return true;
            }
            return false;
       })
        
    }
  }
  
}
