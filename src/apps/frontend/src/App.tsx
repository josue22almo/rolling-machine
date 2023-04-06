import React from 'react';

import './App.css';
import {Game} from "./components/Game";
import {GameViewModel} from "./view-models/GameViewModel";


function App() {
  const viewModel = GameViewModel();

  return (
    <div className="App">
      <header className="App-header">
        <Game
          appState={viewModel.appState}
          account={viewModel.account!}
          session={viewModel.session!}
          isLoading={viewModel.isLoading}
          currentRoll={viewModel.currentRoll}
          onRoll={viewModel.roll}
          onInit={viewModel.init}
          message={viewModel.message}
          error={viewModel.error}
        />

      </header>
    </div>
  );
}

export default App;
