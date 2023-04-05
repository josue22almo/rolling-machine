import {Roll} from "../src/domain/roll";
import {ERoolValue} from "../src/domain/ERoolValue";

export class RollObjectMother {
    static failed() {
        return new Roll([ERoolValue.CHERY, ERoolValue.LEMON, ERoolValue.ORANGE]);
    }

    static winning() {
        return new Roll([ERoolValue.CHERY, ERoolValue.CHERY, ERoolValue.CHERY]);
    }

    static chery() {
        return new Roll([ERoolValue.CHERY, ERoolValue.CHERY, ERoolValue.CHERY]);
    }

    static lemon() {
        return new Roll([ERoolValue.LEMON, ERoolValue.LEMON, ERoolValue.LEMON]);
    }

    static orange() {
        return new Roll([ERoolValue.ORANGE, ERoolValue.ORANGE, ERoolValue.ORANGE]);
    }

    static watermelon() {
        return new Roll([ERoolValue.WATERMELON, ERoolValue.WATERMELON, ERoolValue.WATERMELON]);
    }
}