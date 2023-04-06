import {SessionRepository} from "../domain/SessionRepository";
import {AccountRepository} from "../domain/AccountRepository";

export class DepositSessionController {
  constructor(private readonly sessionRepository: SessionRepository, private readonly accountRepository: AccountRepository) {
  }

  deposit(sessionId: string): void {
    const session = this.sessionRepository.get(sessionId);
    if (session === undefined) {
      throw new Error("Session not found");
    }

    const account = this.accountRepository.get();
    session.deposit(account);

    this.sessionRepository.update(session);
    this.accountRepository.update(account);
  }
}