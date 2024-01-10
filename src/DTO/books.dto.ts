import { ArrayMinSize, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested, isNotEmptyObject } from "class-validator";
import { AuthorDTO } from "./author.dto";
import { Type } from "class-transformer";

export class BookDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    @ValidateNested()
    readonly author: AuthorDTO[];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly language: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly releaseYear: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly publisher: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly pages: number;
}