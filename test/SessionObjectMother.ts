import { Session } from "../src/domain/session";

export class SessionObjectMother {
    static empty(): Session {
        return new Session(undefined, "1");
    }

    static withCredits(credits: number): Session {
        return new Session(credits, "1");
    }

    static withId(id: string) {
        return new Session(undefined, id);
    }
}