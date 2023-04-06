export class CreateSessionController {
    async createSession(): Promise<{ id: string }> {
        const createSessionResponse = await fetch(`http://localhost:8080/session`, {method: "POST"});
        return await createSessionResponse.json();
    }
}