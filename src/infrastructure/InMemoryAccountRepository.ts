import {Account} from "../domain/account";
import {AccountRepository} from "../domain/AccountRepository";

export class InMemoryAccountRepository implements AccountRepository {
    private account: Account;

    constructor() {
        this.account = new Account();
    }


    get(): Account {
        return this.account;
    }

    update(account: Account): void {
        this.account = account;
    }
}