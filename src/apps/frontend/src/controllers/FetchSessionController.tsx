import {Session} from "../models/Session";

export class FetchSessionController {
    async fetchSession(id: string): Promise<Session> {
        const sessionResponse = await fetch(`http://localhost:8080/session/${id}`);
        const data = await sessionResponse.json();
        return data;
    }

    async fetchAllSessions(): Promise<Session[]> {
        const sessionResponse = await fetch(`http://localhost:8080/session`);
        const data = await sessionResponse.json();
        return data.sessions;
    }
}