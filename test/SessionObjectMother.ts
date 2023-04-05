import { Session } from "../src/domain/session";

export class SessionObjectMother {
    static empty(): Session {
        return new Session();
    }

    static withCredits(credits: number): Session {
        return new Session(credits);
    }
}