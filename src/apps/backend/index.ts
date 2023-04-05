import {App} from "./App";
import {InMemoryAccountRepository} from "../../infrastructure/InMemoryAccountRepository";
import {InMemorySessionRepository} from "../../infrastructure/InMemorySessionRepository";

new App(
    new InMemorySessionRepository(),
    new InMemoryAccountRepository()
).start(3000);