import {describe, expect, test} from '@jest/globals';
import {InMemorySessionRepository} from "../../src/infrastructure/InMemorySessionRepository";
import {SessionObjectMother} from "../SessionObjectMother";
import {CreateSessionController} from "../../src/controllers/CreateSessionController";


describe("Create session controller", () => {
    test("should create a session", () => {
        const sessionRepository = new InMemorySessionRepository();

        const controller = new CreateSessionController(sessionRepository);

        controller.create("1");
        expect(sessionRepository.getAll().length).toEqual(1);
    });

    test("should not create a session when there is already one session created", () => {
        const sessionRepository = new InMemorySessionRepository();
        sessionRepository.insert(SessionObjectMother.withId("1"));

        const controller = new CreateSessionController(sessionRepository);

        controller.create("2");

        expect(sessionRepository.getAll().length).toEqual(1);
    });
})
