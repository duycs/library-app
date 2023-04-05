export interface BookItem {
    id:number;
    bookId: number;
    barcode: string;
    isReferenceOnly: boolean;
    borrowedDate: Date;
    dueDate: Date;
    price: number;
    formatId: number;
    bookStatusId: number;
    purchaseDate: Date;
    rackId: number;
    libraryId: number;
}