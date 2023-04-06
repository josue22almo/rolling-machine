import {useState} from "react";
import {Session} from "../models/Session";
import {Account} from "../models/Account";
import {Roll} from "../models/Roll";
import {FetchSessionController} from "../controllers/FetchSessionController";
import {RollController} from "../controllers/RollController";
import {CreateSessionController} from "../controllers/CreateSessionController";
import {FetchAccountController} from "../controllers/FetchAccountController";
import {CashOutController} from "../controllers/CashOutController";
import {DepositController} from "../controllers/DepositController";


export function GameViewModel() {
  const [appState, setAppState] = useState<"awaiting" | "playing">("awaiting");

  const [session, setSession] = useState<Session>();
  const [account, setAccount] = useState<Account>();
  const [currentRoll, setCurrentRoll] = useState<Roll>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSession = async (id: string) => {
    const controller = new FetchSessionController();
    const data = await controller.fetchSession(id);
    setSession(data)
  }

  const roll = async () => {
    if (session!.credits === 0) {
      setError("No credits available");
      return;
    }
    setIsLoading(true);

    setCurrentRoll({
      content: ["X", "X", "X"],
      isSuccessful: false,
      reward: 0
    });
    setMessage("Rolling...");

    const createdRoll = await new RollController().roll(session!.id);

    const roll = ["X", "X", "X"];

    const sleep = (seconds: number) => {
      return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    await sleep(0.5);
    for (let i = 0; i < createdRoll.content.length; i++) {
      roll[i] = createdRoll.content[i];
      setCurrentRoll({
        content: roll,
        isSuccessful: createdRoll.isSuccessful,
        reward: createdRoll.reward
      });
      await sleep(1);
    }

    if (createdRoll.isSuccessful) {
      setMessage(`You won ${createdRoll.reward} credits!`);
    } else {
      setMessage(`You lost this roll!`);
    }

    await fetchSession(session!.id);
    setIsLoading(false);
    resetCashOutButtonStyle();
  }

  const fetchOrCreateSession = async () => {
    const sessions = await new FetchSessionController().fetchAllSessions();
    if (sessions.length > 0) {
      setSession(sessions[0]);
    } else {
      const session = await new CreateSessionController().createSession();
      await fetchSession(session.id);
    }
  }

  const fetchAccount = async () => {
    const controller = new FetchAccountController();
    const accountData = await controller.fetchAccount();
    setAccount(accountData);
  }

  const init = async () => {
    try {
      await fetchOrCreateSession();
      await fetchAccount();

      setAppState("playing");
    } catch (e) {
      setError("Error fetching session");
    }
  }

  const deposit = async () => {
    setIsLoading(true);
    await new DepositController().deposit(session!.id);
    await fetchSession(session!.id);
    await fetchAccount();
    setIsLoading(false);
  }

  const [cashOutButtonStyle, setCashOutButtonStyle] = useState({top: "", disable: false});

  function guessProbability(number: number): boolean {
    const random = Math.floor(Math.random() * 100);
    return random > number;
  }

  const resetCashOutButtonStyle = () => {
    setCashOutButtonStyle({top: "", disable: false});
  }

  const cashOut = async () => {
    await new CashOutController().cashOut(session!.id);
    await fetchSession(session!.id);
    await fetchAccount();
  }

  const moveCashOutButton = () => {
    let top = "";
    let disable = false;
    if (guessProbability(50)) {
      top = "300px";
    }
    if (guessProbability(40)) {
      disable = true;
    }
    setCashOutButtonStyle({top, disable});
  }

  return {
    appState,
    session,
    account,
    currentRoll,
    message,
    error,
    isLoading,
    init,
    roll,
    cashOutButtonStyle,
    resetCashOutButtonStyle,
    moveCashOutButton,
    cashOut,
    deposit
  }
}