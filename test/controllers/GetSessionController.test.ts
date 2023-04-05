import {describe, expect, test} from '@jest/globals';
import {InMemorySessionRepository} from "../../src/infrastructure/InMemorySessionRepository";
import {GetSessionController} from "../../src/controllers/GetSessionController";
import {SessionObjectMother} from "../SessionObjectMother";


describe("Get session controller", () => {
    test("should return the session", () => {
        const sessionRepository = new InMemorySessionRepository();
        sessionRepository.insert(SessionObjectMother.withId("1"));

        const getSessionController = new GetSessionController(sessionRepository);

        expect(getSessionController.get("1")).not.toBeUndefined();
    });

    test("should return undefined if the session does not exist", () => {
        const sessionRepository = new InMemorySessionRepository();

        const getSessionController = new GetSessionController(sessionRepository);

        expect(getSessionController.get("2")).toBeUndefined();
    });
})
