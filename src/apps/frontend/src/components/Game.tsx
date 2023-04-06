import {Account} from "../models/Account";
import {Session} from "../models/Session";
import {Roll} from "../models/Roll";
import React from "react";
import {Message} from "./Message";
import {StartGame} from "./StartGame";

interface Props {
    appState: "awaiting" | "playing";
    account: Account;
    session: Session;
    isLoading: boolean;
    currentRoll: Roll | undefined;
    onRoll: () => void;
    onInit: () => void;
    message: string | undefined;
    error: string | undefined;
}

export function Game({
     appState,
     account,
     session,
     isLoading,
     currentRoll,
     onRoll,
     onInit,
     message,
     error
}: Props) {
    function GamePlayingDisplay({ visible }: { visible: boolean }) {
        if (!visible) {
            return null;
        }
        function selectItemStyle(item: string) {
            const style = {
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: "gray",
            }
            switch (item) {
                case "cherry":
                    style.backgroundColor = "red";
                    break;
                case "lemon":
                    style.backgroundColor = "yellow";
                    break;
                case "orange":
                    style.backgroundColor = "orange";
                    break;
                case "watermelon":
                    style.backgroundColor = "pink";
                    break;
            }
            return style;
        }
        return (
            <div>
                <div>
                    <p>Your account balance is {account.balance}</p>
                    <p>Available credits {session.credits}</p>
                </div>
                {
                    currentRoll && (
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {currentRoll.content.map((item, index) => {
                                return <div className="square" key={`row-item-${index}`} style={selectItemStyle(item)}>
                                    {item[0].toUpperCase()}
                                </div>
                            })}

                        </div>
                    )
                }
                <button onClick={onRoll} disabled={isLoading}>
                    Roll
                </button>
            </div>
        )
    }

    return (
        <div>
            <StartGame onClick={onInit} visible={appState === "awaiting"}/>
            <GamePlayingDisplay visible={appState === "playing"}/>
            <Message message={message} variant="info"/>
            <Message message={error} variant="warning"/>
        </div>
    )
}