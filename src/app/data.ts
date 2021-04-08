import { Book } from "./models/book";
import { Reader } from "./models/reader";

export const allBooks: Book[] = [
    { title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
    { title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
    { title: 'Where the Wild Things Are', author: 'Maurice Sendak', publicationYear: 1963 },
    { title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 },
    { title: 'Curious George', author: 'H. A. Rey', publicationYear: 1941 },
    { title: 'Alice\'s Adventures in Wonderland', author: 'Lewis Carroll', publicationYear: 1865 },
];

export const allReaders: Reader[] = [
    { readerID: 1, name: 'Marie', weeklyReadingGoal: 400, totalMinutesRead: 5600 },
    { readerID: 2, name: 'Daniel', weeklyReadingGoal: 210, totalMinutesRead: 3000 },
    { readerID: 3, name: 'Lanier', weeklyReadingGoal: 140, totalMinutesRead: 600 }
];