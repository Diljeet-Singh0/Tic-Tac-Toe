import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useTicTacToe } from "./hooks/useTicTacToe";
import { useTicTacToe } from "./hooks/useTikTakToe.jsx";
import QuestionModal from "./components/QuestionModal";

import Button from "./components/Button";
import Square from "./components/Square";

function App() {
  const {
    squares,
    turn,
    winner,
    activeQuestion,
    feedback,
    updateSquares,
    handleAnswerSubmit,
    resetGame,
    setActiveQuestion,
  } = useTicTacToe();

  // Render 0..8 as numbers (not characters). Use Array.from({length:9}, (_,i)=>i)
  return (
    <div className="tic-tac-toe">
      <h1>TIC-TAC-TOE Quiz Edition</h1>

      <div className="game">
        {Array.from({ length: 9 }, (_, i) => i).map((ind) => (
          <Square
            key={ind}
            ind={ind}
            updateSquares={() => updateSquares(ind)}
            clsName={squares[ind]}
          />
        ))}
      </div>

      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>

      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              className="text"
            >
              <motion.h2
                initial={{
                  scale: 0,
                  y: 100,
                }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: {
                      delay: 0.7,
                    },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "x | o" ? "It's a Tie!" : `Winner: ${winner.toUpperCase()} 🎉`}
              </motion.h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "x | o" ? (
                  <>
                    <Square clsName="x" />
                    <Square clsName="o" />
                  </>
                ) : (
                  <Square clsName={winner} />
                )}
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.5,
                    duration: 0.3,
                  },
                }}
              >
                <Button resetGame={resetGame} text="Play Again" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Modal wired to the hook */}
      {activeQuestion && (
        <QuestionModal
          questionObj={activeQuestion}
          feedback={feedback}
          onSubmit={handleAnswerSubmit}
          onClose={() => setActiveQuestion(null)}
        />
      )}
    </div>
  );
}

export default App;
