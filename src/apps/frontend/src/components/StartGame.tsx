import React from "react";

export function StartGame({onClick, visible}: { onClick?: () => void; visible: boolean }) {
    if (!visible) {
        return null;
    }
    return (
        <button onClick={onClick}>
            Start game
        </button>
    )
}