import {Request, Response, Router} from "express";
import {AccountRepository} from "../../../domain/AccountRepository";

export class AccountRouter {
    readonly router: Router;

    constructor(private readonly accountRepository: AccountRepository) {
        this.router = Router();

        this.router.get("/account", (req, res) => this.getAccount(req, res));
    }

    private getAccount(req: Request, res: Response) {
        const account = this.accountRepository.get();
        res.send({
            balance: account.balance,
        });
    }
}