import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/account";

export class GetAccountController {
    constructor(private readonly accountRepository: AccountRepository) {
    }

    get(): Account {
        return this.accountRepository.get();
    }
}