import {SessionRepository} from "../domain/SessionRepository";
import {Roll} from "../domain/roll";

export class RollSessionController {
    constructor(private readonly sessionRepository: SessionRepository) {
    }

    roll(sessionId: string): Roll | undefined {
        const session = this.sessionRepository.get(sessionId);
        if (session === undefined) {
            throw new Error("Session not found");
        }
        const roll = session.roll();
        this.sessionRepository.update(session);
        return roll;
    }
}