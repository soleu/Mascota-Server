import { IBook } from "../../../interfaces/book/IBook";

export class ReadyPartingAndStartRecordResDto{
    diaryCount = 0;
    dayTogether = 0;
    bookInfo = {}

    constructor(diaryCount : number, dayTogether : number, bookInfo : BookInfoResDto){
        this.diaryCount = diaryCount
        this.dayTogether = dayTogether
        this.bookInfo = bookInfo
    }
}

export class BookInfoResDto{
    title = null;
    bookImg = null;

    constructor(book : IBook){
        this.title = book.title
        this.bookImg = book.imgs
    }
}