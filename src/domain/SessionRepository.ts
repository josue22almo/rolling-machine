import {Session} from "./session";

export interface SessionRepository {
    insert(session: Session): void;
    get(): Session;
    update(session: Session): void;
}

