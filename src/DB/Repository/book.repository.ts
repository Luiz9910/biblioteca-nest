import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('book') private readonly bookModel: Model<Book>
    ){}

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find({}, { __v: false}).sort({name: +1});
    }

    async getBookById(bookId: string): Promise<Book> {
        return this.bookModel.findById(bookId, {__v: false});
    }

    async getBooksByAuthorName(authorName: string[]): Promise<Book[]> {
        return await this.bookModel.find({
            $or: [
                {"author.name": {$in: authorName}},
                {"author.surname" : {$in: authorName}}
            ]
        })
    }

    async getBookByName(bookName: string): Promise<Book[]> {
        return this.bookModel.find({
            name: {"$regex": bookName, "$options" : "i"}
        }, {__v: false});
    }

    async saveBook(newBook: BookDTO): Promise<Book> {
        const saveBook = new this.bookModel(newBook);
        return await saveBook.save();
    }

    async updateBookById(bookId: string, newBook: BookDTO): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(
            bookId,
            newBook,
            { new: true }
        );

        return updatedBook;
    }

    async deleteBookById(bookId: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(bookId, {__v: false});
    }
}
