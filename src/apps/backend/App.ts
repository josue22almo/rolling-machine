import express, {Application, Router} from "express";
import logger from "morgan";
import cors from "cors";

import {SessionRepository} from "../../domain/SessionRepository";
import {AccountRepository} from "../../domain/AccountRepository";
import * as http from "http";
import {AccountRouter} from "./routers/AccountRouter";
import {SessionRouter} from "./routers/SessionRouter";

export class App {
    readonly app: Application;
    private server?: http.Server;

    constructor(sessionRepository: SessionRepository, accountRepository: AccountRepository) {
        this.app = express();

        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors())

        this.addRouter(new SessionRouter(sessionRepository, accountRepository).router);
        this.addRouter(new AccountRouter(accountRepository).router);
    }

    start(port: number): void {
        this.app.get('/health', (req, res) => {
            res.send('Health check!')
        })

        this.server = this.app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }

    private addRouter(router: Router): void {
        this.app.use(router);
    }

    stop() {
        this.server?.close();
    }
}

