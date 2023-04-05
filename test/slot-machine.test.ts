import {describe, expect, test, afterEach} from '@jest/globals';

import sinon from 'sinon';
import {Roll} from '../src/roll';
import {Session} from '../src/session';

import {RollObjectMother} from "./RollObjectMother";
import {Account} from "../src/account";

describe("Slot machine", () => {
  afterEach(() => {
    sinon.restore()
  });

  test("a session must be created with 10 starting credits", () => {
    const session = new Session();
    expect(session.credits).toEqual(10);
  });

  test("a session must be initiated with some credits", () => {
    const session = new Session(100);
    expect(session.credits).toEqual(100);
  });

  test("one roll cost 1 credit", () => {
    const session = new Session(20);
    sinon.stub(Roll, "random").returns(RollObjectMother.failed());
    session.roll();
    expect(session.credits).toEqual(19);
  });

  test("a successful roll should sum the roll reward to the session credits", () => {
    const session = new Session(100);
    sinon.stub(Roll, "random").returns(RollObjectMother.chery());

    session.roll();
    expect(session.credits).toEqual(109);
  });

  test("When a user has less than 40 credits in the game session, their rolls are truly random", () => {
    const session = new Session();

    const randomSpy = sinon.stub(Roll, "random").returns(RollObjectMother.failed());

    for (let i = 0; i < 100; i++) {
      session.roll();
    }

    expect(randomSpy.callCount).toEqual(100);
  });


  test("When a user has between 40 and 60 credits and did a winning roll, the session must re-roll it with a 30% probability.", () => {
    const session = new Session(50);

    const randomSpy = sinon.stub(Roll, "random").returns(RollObjectMother.chery());

    for (let i = 0; i < 100; i++) {
      session.roll();
    }

    expect(randomSpy.callCount).toBeGreaterThan(100);
  });

  test("When a user has above 60 credits and did a winning roll, the session must re-roll it with a 60% probability", () => {
    const session = new Session(70);

    const randomSpy = sinon.stub(Roll, "random").returns(RollObjectMother.chery());

    for (let i = 0; i < 100; i++) {
      session.roll();
    }

    expect(randomSpy.callCount).toBeGreaterThan(100);
  });


  test("a winning roll should have the 3 cells equal", () => {
      expect(RollObjectMother.winning().isSuccessful()).toEqual(true);
  })

  test("a chery winning roll should reward 10 credits", () => {
      expect(RollObjectMother.chery().getReward()).toEqual(10);
  });

  test("a lemon winning roll should reward 20 credits", () => {
      expect(RollObjectMother.lemon().getReward()).toEqual(20);
  });

  test("a orange winning roll should reward 30 credits", () => {
      expect(RollObjectMother.orange().getReward()).toEqual(30);
  });

  test("a watermelon winning roll should reward 30 credits", () => {
      expect(RollObjectMother.watermelon().getReward()).toEqual(40);
  });

  test("no successfull roll should reward 0 credits", () => {
      expect(RollObjectMother.failed().getReward()).toEqual(0);
  });

  test("cashing out should transfer the credits to the user account", () => {
    const account = new Account();
    const session = new Session(100);

    session.cashOut(account);

    expect(account.balance).toEqual(100);
  });
});

