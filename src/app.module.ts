import { Module } from '@nestjs/common';
import { BooksController } from './controller/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './Services/books/books.service';
import { BookRepository } from './DB/Repository/book.repository';
import { BookSchema } from './DB/Schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/biblioteca'),

    MongooseModule.forFeature([
      {name: 'book', schema: BookSchema}
    ])
    
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
