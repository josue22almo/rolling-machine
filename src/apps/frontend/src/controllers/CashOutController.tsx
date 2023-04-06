export class CashOutController {
  async cashOut(sessionId: string) {
    await fetch(`http://localhost:8080/session/${sessionId}/cash-out`, {
      method: "POST",
    });
  }
}