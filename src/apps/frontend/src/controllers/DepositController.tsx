export class DepositController {
  async deposit(sessionId: string) {
    await fetch(`http://localhost:8080/session/${sessionId}/deposit`, {
      method: "POST",
    });
  }
}