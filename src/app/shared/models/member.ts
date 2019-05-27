import { Person } from "./person";

export class Member {
    id: number;
    dateOfMembership: Date;
    totalBooksCheckedout: number;
    person: Person;
    accountId: number;
    accountStatus: number;
    libraryCardId: number;
}