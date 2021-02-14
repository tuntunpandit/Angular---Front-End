import { Injectable } from "@angular/core";
import { allBooks, allReaders } from "../data";
import { Book } from "../models/book";
import { Reader } from "../models/reader";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor() {}

    mostPopularBook: Book = allBooks[0];
    
    getAllBooks(): Book[] {
        return allBooks;
    }

    getAllReaders(): Reader[] {
        return allReaders;
    }
}