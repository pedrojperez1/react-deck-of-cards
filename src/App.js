import Deck from "./Deck";
import AutoDeck from "./AutoDeck";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Manual Deck</h1>
      <Deck />
      <h1>Auto Deck</h1>
      <AutoDeck />
    </div>
  );
}

export default App;
