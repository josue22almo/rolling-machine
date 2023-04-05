import {Session} from "./session";

export interface SessionRepository {
    insert(session: Session): void;
    get(id: string): Session | undefined
    update(session: Session): void;
    getAll(): Session[];
}

