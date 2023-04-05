import { Person } from "./person";

export interface Member {
    id?: number;
    dateOfMembership?: Date;
    totalBooksCheckedout?: number;
    person?: Person;
    accountId?: number;
    accountStatus?: number;
    libraryCardId?: string;
}