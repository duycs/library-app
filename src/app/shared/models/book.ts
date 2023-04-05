export interface Book {
    uid: number;
    id: number;
    isbn: number;
    coverImage: string;
    ebook: string;
    ebookType: string;
    description: string;
    title: string;
    publisher: string;
    publicationDate: Date;
    language: string;
    pageNumber: number;

    authors: string;
    subjects: string;
    tags: string;
    reactCount: number;
}