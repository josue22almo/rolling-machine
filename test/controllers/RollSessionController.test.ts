
import {describe, expect, test} from '@jest/globals';
import {InMemorySessionRepository} from "../../src/infrastructure/InMemorySessionRepository";
import {SessionObjectMother} from "../SessionObjectMother";
import {RollSessionController} from "../../src/controllers/RollSessionController";

describe("Roll session controller", () => {
    test("should update the session", () => {
        const sessionRepository = new InMemorySessionRepository();

        sessionRepository.insert(SessionObjectMother.withCredits(100) );

        const controller = new RollSessionController(sessionRepository);

        controller.roll("1");
        expect(sessionRepository.get("1")?.credits).not.toEqual(100);
    })
})
