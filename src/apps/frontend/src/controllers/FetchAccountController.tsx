import {Account} from "../models/Account";

export class FetchAccountController {
    async fetchAccount(): Promise<Account> {
        const accountResponse = await fetch(`http://localhost:8080/account`);
        const data = await accountResponse.json();
        return data;
    }
}