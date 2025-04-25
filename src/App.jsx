import "./App.css";

import { GameContainer, GameHeader } from "./components/gameContainer";
function App() {
  return (
    <>
      <header>
        <GameHeader />
      </header>
      <main>
        <GameContainer />
      </main>
    </>
  );
}

export default App;
