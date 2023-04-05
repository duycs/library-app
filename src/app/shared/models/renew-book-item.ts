export interface RenewBookItem {
    borrowedDate: Date;
    dueDate: Date;
    returnDate: Date;
    rackId: number;
    memberId: number;
    bookItemId: number;
    bookItemBarcode: string;
}