import {SessionRepository} from "../domain/SessionRepository";
import {Session} from "../domain/session";

export class CreateSessionController {
    constructor(private readonly sessionRepository: SessionRepository) {
    }

    create(id: string): Session | undefined {
        if (this.sessionRepository.getAll().length > 0) {
            return this.sessionRepository.get(id);
        }
        const session = new Session(undefined, id);
        this.sessionRepository.insert(session);
        return session;
    }
}