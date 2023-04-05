import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {App} from "../../../src/apps/backend/App";

import request from 'supertest';
import {InMemorySessionRepository} from "../../../src/infrastructure/InMemorySessionRepository";
import {InMemoryAccountRepository} from "../../../src/infrastructure/InMemoryAccountRepository";

describe("Backend api tests", () => {
    let app: App;

    beforeAll(() => {
        app = new App(new InMemorySessionRepository(), new InMemoryAccountRepository());
        app.start(3000);
    })

    afterAll(() => {
        app.stop();
    })

    test("should be up and running", async () => {
        const response = await request(app.app).get("/health");

        expect(response.status).toEqual(200);
    })

    test("1. should create a session", async () => {
        const response = await request(app.app).post("/session");

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual("1");
    });

    test("2. should get a session", async () => {
        const response = await request(app.app).get("/session/1");

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual("1");
    });

    test("3. should roll session", async () => {
        const response = await request(app.app).post("/session/1/roll");

        expect(response.status).toEqual(200);
        expect(response.body.roll.content.length).toEqual(3);
        expect(response.body.roll.isSuccessful).toBeDefined();
        expect(response.body.roll.reward).toBeDefined();
    });

    test("4. should cash out session", async () => {
        const response = await request(app.app).post("/session/1/cash-out");

        expect(response.status).toEqual(200);
    });

    test("5. should get account", async () => {
        const response = await request(app.app).get("/account");

        expect(response.status).toEqual(200);
        expect(response.body.balance).toBeDefined();
    });
})