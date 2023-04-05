import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';

import './App.css';

function App() {
  const [appState, setAppState] = useState<"awaiting" | "playing">("awaiting");

  const [session, setSession] = useState<{
    id: string;
    credits: number;
  }>();
  const [account, setAccount] = useState<{
    balance: number;
  }>();
  const [currentRoll, setCurrentRoll] = useState<{
    content: string[];
    isSuccessful: boolean;
    reward: number;
  }>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const init = async () => {
    try {
      const sessionResponse = await fetch(`http://localhost:8080/session`);
      const data = await sessionResponse.json();
      console.log("session response data",data);
      if (data.sessions.length > 0) {
        setSession(data.sessions[0]);
      } else {
        const createSessionResponse = await fetch(`http://localhost:8080/session`, { method: "POST" });
        const createSessionData = await createSessionResponse.json();

        await fetchSession(createSessionData.id);
      }

      const accountResponse = await fetch(`http://localhost:8080/account`);
      const accountData = await accountResponse.json();
      setAccount(accountData);
      setAppState("playing")
    } catch (e) {
      console.log(e);
      setError("Error fetching session");
    }
  }

  const fetchSession = async (id: string) => {
    const sessionResponse = await fetch(`http://localhost:8080/session/${id}`);
    const data = await sessionResponse.json();
    setSession(data)
  }

  const roll = async () => {
    if (session!.credits === 0) {
      setError("No credits available");
      return;
    }
    setCurrentRoll(undefined);
    setMessage("Rolling...");

    const response = await fetch(`http://localhost:8080/session/${session!.id}/roll`, { method: "POST" });
    const data = await response.json();
    console.log("roll session response data",data);

    const rolls = []

    const sleep = (seconds: number) => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    for (let i = 0; i < data.roll.content.length; i++) {
        rolls.push(data.roll.content[i]);
        setCurrentRoll({
            content: rolls,
            isSuccessful: data.roll.isSuccessful,
            reward: data.roll.reward
        });
        await sleep(1);
    }

    if (data.roll.isSuccessful) {
        setMessage(`You won ${data.roll.reward} credits!`);
    } else {
        setMessage(`You lost this roll!`);
    }

    await fetchSession(session!.id);
  }

  function selectItemStyle(item: string) {
    switch (item) {
      case "cherry":
        return {
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: 'center'
        }
      case "lemon":
        return {
          backgroundColor: "yellow",
          alignItems: "center",
          justifyContent: 'center'
        }
      case "orange":
        return {
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: 'center'

        }
      case "watermelon":
        return {
          backgroundColor: "pink",
          alignItems: "center",
          justifyContent: 'center'
        }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          appState === "awaiting" && (
              <button onClick={init}>
                Start game
              </button>
            )
        }
        {
            appState === "playing" && (
                <div>
                  <div>
                    <p>Your account balance is {account!.balance}</p>
                    <p>Available credits {session!.credits}</p>
                  </div>
                  {
                    currentRoll && (
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {currentRoll.content.map((item, index) => {
                              return <div className="square" key={`row-item-${index}`} style={selectItemStyle(item)} >
                                {item[0].toUpperCase()}
                              </div>
                            })}

                        </div>
                      )
                  }
                  <button onClick={roll}>
                    Roll
                  </button>
                </div>
            )
        }
        {
            message && (
                <Alert variant="info">
                  {message}
                </Alert>
            )
        }
        {
          error && (
                <Alert variant="warning">
                  {error}
                </Alert>
            )
        }

      </header>
    </div>
  );
}

export default App;
