import {Session} from "../domain/session";
import {SessionRepository} from "../domain/SessionRepository";

export class GetSessionController {
    constructor(private readonly sessionRepository: SessionRepository) {
    }

    get(id: string): Session | undefined {
        return  this.sessionRepository.get(id);
    }
}

