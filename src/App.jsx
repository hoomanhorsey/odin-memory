import "./App.css";

import { GameContainer } from "./components/gameControl";
import { GameHeader } from "./components/gameHeader";
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
