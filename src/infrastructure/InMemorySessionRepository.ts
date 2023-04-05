import {SessionRepository} from "../domain/SessionRepository";
import {Session} from "../domain/session";

export class InMemorySessionRepository implements SessionRepository {
    private sessions: Map<string, Session> = new Map();

    insert(session: Session): void {
        this.update(session)
    }

    get(id: string): Session | undefined {
        return this.sessions.get(id);
    }

    update(session: Session): void {
        this.sessions.set(session.id, session);
    }

    getAll(): Session[] {
        return Array.from(this.sessions.values());
    }
}