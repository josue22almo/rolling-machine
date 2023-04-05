import {Request, Response, Router} from "express";
import {SessionRepository} from "../../../domain/SessionRepository";
import {AccountRepository} from "../../../domain/AccountRepository";
import {GetSessionController} from "../../../controllers/GetSessionController";
import {CreateSessionController} from "../../../controllers/CreateSessionController";
import {RollSessionController} from "../../../controllers/RollSessionController";
import {CashOutSessionController} from "../../../controllers/CashOutSessionController";

export class SessionRouter {
    readonly router: Router;

    constructor(private readonly sessionRepository: SessionRepository, private readonly accountRepository: AccountRepository) {
        this.router = Router();

        this.router.get("/session", (req, res) => this.getAllSession(req, res));
        this.router.post("/session", (req, res) => this.createSession(req, res));
        this.router.get("/session/:id", (req, res) => this.getSession(req, res));
        this.router.post("/session/:id/roll", (req, res) => this.rollSession(req, res));
        this.router.post("/session/:id/cash-out", (req, res) => this.cashOutSession(req, res));
    }

    private getAllSession(req: Request, res: Response) {
        const sessions = new GetSessionController(this.sessionRepository).getAll();

        res.send({
            sessions: sessions.map(s => ({
                id: s.id,
                credits: s.credits,
            }))
        });
    }

    private getSession(req: Request, res: Response) {
        const session = new GetSessionController(this.sessionRepository).get(req.params.id);
        if (session === undefined) {
            res.status(404).send("Session not found");
            return
        }
        res.send({
            id: session.id,
            credits: session.credits,
        });
    }

    private createSession(req: Request, res: Response) {
        const session = new CreateSessionController(this.sessionRepository).create("1");
        if (session === undefined) {
            res.status(201).send("Session already created");
            return
        }
        res.send({
            id: session.id,
            credits: session.credits,
        });
    }

    private rollSession(req: Request, res: Response) {
        try {
            const roll = new RollSessionController(this.sessionRepository).roll(req.params.id);
            if (roll === undefined) {
                res.status(400).send("No more credits");
                return;
            }
            res.send({
                roll: {
                    content: roll.getContent(),
                    isSuccessful: roll.isSuccessful(),
                    reward: roll.getReward(),
                },

            })
        } catch (e) {
            res.status(404).send("Session not found");
            return
        }

    }

    private cashOutSession(req: Request, res: Response) {
        try {
            new CashOutSessionController(this.sessionRepository, this.accountRepository).cashOut(req.params.id);
            res.send({
                message: "Successfully cashed out",
            })
        } catch (e) {
            res.status(404).send("Session not found");
            return
        }
    }
}