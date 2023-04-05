import {ERoolValue} from "./ERoolValue";

export class Roll {
    private _result: ERoolValue[];

    constructor(result = [] as ERoolValue[]) {
        this._result = result;
    }

    static random() {
        const roll = new Roll();
        roll._result = [
            this.getRandom(),
            this.getRandom(),
            this.getRandom(),
        ];
        return roll;
    }

    private static getRandom() {
        const values = Object.values(ERoolValue);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    }

    equals(roll: Roll) {
        return this._result[0] === roll._result[0] &&
            this._result[1] === roll._result[1] &&
            this._result[2] === roll._result[2];
    }

    isSuccessful() {
        return this._result[0] === this._result[1] && this._result[1] === this._result[2];
    }

    getReward() {
        if (!this.isSuccessful()) {
            return 0;
        }
        switch (this.type) {
            case ERoolValue.CHERY:
                return 10;
            case ERoolValue.LEMON:
                return 20;
            case ERoolValue.ORANGE:
                return 30;
            case ERoolValue.WATERMELON:
                return 40;
        }
    }

    private get type() {
        return this._result[0];
    }

    getContent() {
        return this._result;
    }
}