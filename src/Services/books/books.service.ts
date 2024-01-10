import { BadRequestException, Injectable } from '@nestjs/common';
import { Book } from 'src/DB/Interfaces/book.interface';
import { BookRepository } from 'src/DB/Repository/book.repository';
import { BookDTO } from 'src/DTO/books.dto';

@Injectable()
export class BooksService {

   constructor(
        private readonly bookRepository: BookRepository
   ){}

    async getAllBooks(): Promise<Book[]> {
        const allBooks = await this.bookRepository.getAllBooks();
        if (!allBooks.length) {
            throw new BadRequestException("There are no books registered yet");
        }

        return allBooks;
    }

    async getBookById(bookId: string): Promise<Book> {
        try {
            return this.bookRepository.getBookById(bookId);
        } catch (err) {
            throw new BadRequestException("There are not results")
        }
    }

    async getBookAuthorName(authorName: string): Promise<Book[]> {
        const splitedAuthorName = authorName.split(' ');

        const foundBooks = await this.bookRepository.getBooksByAuthorName(splitedAuthorName);
        if(!foundBooks.length) {
            throw new BadRequestException("No results for this author");
        }

        return foundBooks;
    }

    async getBookByName(bookName: string): Promise<Book[]> {
        const foundBooks = await this.bookRepository.getBookByName(bookName);
        if(!foundBooks.length) {
            throw new BadRequestException("No results for this author");
        }

        return foundBooks;
    }

    async saveBook(newBook: BookDTO): Promise<Book> {
        return await this.bookRepository.saveBook(newBook);
    }

    async updateBookId(bookId: string, newBook: BookDTO): Promise<Book> {
        const existBook = await this.bookRepository.getBookById(bookId);
        if (!existBook) {
            throw new BadRequestException("There not result");
        }

        return await this.bookRepository.updateBookById(bookId, newBook);
    }

    async deleteBookById(bookId: string): Promise<Book> {
        try {
            return await this.bookRepository.deleteBookById(bookId);
        } catch (err) {
            throw new BadRequestException("There book does not exists")
        }
    }
}
