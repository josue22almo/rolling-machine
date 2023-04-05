import {Account} from "./account";

export interface AccountRepository {
    get(): Account;

    update(account: Account): void;
}