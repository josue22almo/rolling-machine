import {Roll} from "./roll";
import {Account} from "./account";

export class Session {
    private _credits: number;

    constructor(credits = 10) {
        this._credits = credits;
    }

    get credits(): number {
        return this._credits;
    }

    roll() {
        let roll = Roll.random();

        if (this.credits >= 40 && this.credits < 60 && roll.isSuccessful()) {
            if (this.guessProbability(30)) {
                roll = Roll.random();
            }
        } else if (this.credits >= 60 && roll.isSuccessful()) {
            if (this.guessProbability(60)) {
                roll = Roll.random();
            }
        }

        this._credits--;

        if (roll.isSuccessful()) {
            this._credits += roll.getReward();
        }
        return roll;
    }

    cashOut(account: Account) {
        account.deposit(this._credits);
    }

    private guessProbability(number: number): boolean {
        const random = Math.floor(Math.random() * 100);
        return random > number;
    }
}