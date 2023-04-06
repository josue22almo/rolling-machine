import React from 'react';

import './App.css';
import {Game} from "./components/Game";
import {GameViewModel} from "./view-models/GameViewModel";


function App() {
    const {
        appState,
        session,
        account,
        currentRoll,
        message,
        error,
        isLoading,
        init,
        roll
    } = GameViewModel();

  return (
    <div className="App">
      <header className="App-header">
        <Game
            appState={appState}
            account={account!}
            session={session!}
            isLoading={isLoading}
            currentRoll={currentRoll}
            onRoll={roll}
            onInit={init}
            message={message}
            error={error}
        />

      </header>
    </div>
  );
}

export default App;
