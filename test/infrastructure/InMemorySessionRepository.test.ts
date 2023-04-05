import {describe, expect, test, beforeAll} from '@jest/globals';
import {SessionObjectMother} from "../SessionObjectMother";
import {InMemorySessionRepository} from "../../src/infrastructure/InMemorySessionRepository";
import {SessionRepository} from "../../src/domain/SessionRepository";

describe("In memory session repository", () => {
    let repository: SessionRepository;

    beforeAll(() => {
        repository = new InMemorySessionRepository();
    });

    test("should insert a session", () => {
        const session = SessionObjectMother.withId("1")

        repository.insert(session);

        expect(repository.get("1")).toBeDefined();
    });
    test("should get a session", () => {
        const session = SessionObjectMother.withId("1");

        repository.insert(session);

        expect(repository.get("1")).toBeDefined();
    });

    test("should return undefined for a non existen session", () => {
        expect(repository.get("2")).toBeUndefined();
    });

    test("should update a session", () => {
        const session = SessionObjectMother.withId("1");

        repository.insert(session);
        repository.update(session);

        expect(repository.get("1")).toBeDefined();
    });
});