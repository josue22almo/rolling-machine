import {Roll} from "../models/Roll";

export class RollController {
    async roll(sessionId: string): Promise<Roll> {
        const response = await fetch(`http://localhost:8080/session/${sessionId}/roll`, {method: "POST"});
        const data = await response.json();
        return data.roll;
    }
}