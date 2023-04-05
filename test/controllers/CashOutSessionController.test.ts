import {describe, expect, test} from '@jest/globals';
import {InMemorySessionRepository} from "../../src/infrastructure/InMemorySessionRepository";
import {SessionObjectMother} from "../SessionObjectMother";
import {CashOutSessionController} from "../../src/controllers/CashOutSessionController";
import {InMemoryAccountRepository} from "../../src/infrastructure/InMemoryAccountRepository";

describe("Cash out controller", () => {
    test("should update the  and the account", () => {
        const sessionRepository = new InMemorySessionRepository();
        const accountRepository = new InMemoryAccountRepository();

        sessionRepository.insert(SessionObjectMother.withId("1"));

        const controller = new CashOutSessionController(sessionRepository, accountRepository);

        controller.cashOut("1");
        expect(sessionRepository.get("1")?.credits).toEqual(0);
        expect(accountRepository.get()?.balance).toBeGreaterThan(0);
    })
})
