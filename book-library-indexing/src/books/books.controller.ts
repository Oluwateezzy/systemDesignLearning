import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('id')
  findById(@Query('id') id: string) {
    return this.booksService.findById(Number(id));
  }

  @Get('isbn')
  findByIsbn(@Query('isbn') isbn: string) {
    return this.booksService.findByIsbn(isbn);
  }

  @Get('author')
  findByAuthor(@Query('author') author: string) {
    return this.booksService.findByAuthor(author);
  }

  @Get('year-range')
  findByYearRange(@Query('start') start: string, @Query('end') end: string) {
    return this.booksService.findByYearRange(Number(start), Number(end));
  }

  @Get('search-title')
  searchByTitlePartial(@Query('keyword') keyword: string) {
    return this.booksService.searchByTitlePartial(keyword);
  }

  @Get('benchmark')
  benchmark() {
    return this.booksService.benchmarkQueries();
  }
}
