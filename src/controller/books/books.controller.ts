import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Put } from '@nestjs/common';
import { Book } from 'src/DB/Interfaces/book.interface';
import { BookDTO } from 'src/DTO/books.dto';
import { BooksService } from 'src/Services/books/books.service';

@Controller('books')
export class BooksController {

    constructor(
        private readonly booksService: BooksService
    ){}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return await this.booksService.getAllBooks();
    }

    @Get(":bookId")
    async getBookById(@Param('bookId') bookId: string): Promise<Book> {
        return await this.booksService.getBookById(bookId);
    }

    @Get("author/:authorName")
    async getBookAuthorName(@Param('authorName') authorName: string): Promise<Book[]> {
        return await this.booksService.getBookAuthorName(authorName);
    }

    @Get("name/:bookName")
    async getBookBookName(@Param("bookName") bookName: string): Promise<Book[]> {
        return await this.booksService.getBookByName(bookName);
    }

    @Post()
    async saveBook(@Body() newBook: BookDTO):  Promise<Book>  {
        return await this.booksService.saveBook(newBook);
    }

    @Put(":bookId")
    async updateBook(@Param("bookId") bookId: string, @Body() newBook: BookDTO): Promise<Book> {
        return this.booksService.updateBookId(bookId, newBook);
    }

    @Delete(":bookId")
    async deleteBookById(@Param("bookId") bookId: string): Promise<Book> {
        return await this.booksService.deleteBookById(bookId);
    }
}
