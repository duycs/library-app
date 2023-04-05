export interface User {
    accountId: number;
    accountTypes: string[];
    accountName: string;
    userName: string;
    password: string;
    token: string;
    isMember: boolean;
    isLibrarian: boolean;
}