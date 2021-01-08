import { useState, useEffect } from "react";
import "./App.css";
const initMatrix = [];

function App() {
  const [matrix, setMatrix] = useState(initMatrix);

  // State for resetting the game
  const [reset, setReset] = useState(false);

  // State for the winner
  const [seleR, setSeleR] = useState(null);
  const [seleC, setSeleC] = useState(null);
  const [winner, setWinner] = useState(false);

  // isWinner Function
  const isWinner = () => {
    // Creating variables to check winner
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;

    if (seleC === null || seleR === null) {
      return;
    }

    // Looping through to get a match
    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][seleC] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[seleR][i] !== currentPlayer) {
        horizontal = false;
      }
      if (matrix[i][i] !== currentPlayer) {
        d1 = false;
      }
      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        d2 = false;
      }
    }
    if (vertical || horizontal || d1 || d2) {
      setWinner(true);
    }
  };

  // UseEffect to check if there is non winner.
  useEffect(() => {
    if (!winner) {
      isWinner();
    }
  });

  // Setting up matrix size
  const [matrixSize, setMatrixSize] = useState(3);
  // Setting up current player
  const [currentPlayer, setCurrentPlayer] = useState("o");

  // Building the matrix when this component loads
  useEffect(() => {
    setWinner(false);
    setSeleR(null);
    setSeleC(null);
    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];

    // Filling up the matrix Size
    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }
    setMatrix(tempMatrix);
  }, [reset]);

  const squareClick = (indexRow, indexColumn) => {
    if (!matrix[indexRow][indexColumn] && !winner) {
      setSeleC(indexColumn);
      setSeleR(indexRow);
      let nextPlayer = currentPlayer === "x" ? "o" : "x";
      setCurrentPlayer(nextPlayer);

      const matrixCopy = [...matrix];
      matrixCopy[indexRow][indexColumn] = nextPlayer;
      setMatrix(matrixCopy);
    }
  };

  // Function to reset game
  const resetGame = () => {
    setReset(!reset);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {matrix.map((val, indexColumn) => (
            <div key={indexColumn} className="c">
              {val.map((val1, indexRow) => (
                <div
                  key={indexRow}
                  className="r"
                  onClick={() => {
                    squareClick(indexRow, indexColumn);
                  }}
                >
                  {matrix[indexRow][indexColumn]}
                </div>
              ))}
            </div>
          ))}
        </div>

        <h2 style={{ color: "#fff" }}>
          {winner ? `Player ${currentPlayer} is a winner` : ""}
        </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
    </div>
  );
}

export default App;
