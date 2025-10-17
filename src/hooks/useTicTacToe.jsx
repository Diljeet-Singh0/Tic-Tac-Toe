import { useState } from "react";
import { checkWinner, checkEndTheGame } from "../utils/gameLogic";

export const useTicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [feedback, setFeedback] = useState("");

  const questions = [
    { q: "What is 2 + 2?", a: "4" },
    { q: "What is the capital of India?", a: "Delhi" },
    { q: "What is 5 × 6?", a: "30" },
    { q: "Which planet is known as the Red Planet?", a: "Mars" },
    { q: "What color do you get when you mix blue and yellow?", a: "Green" },
    { q: "Who wrote 'Hamlet'?", a: "Shakespeare" },
    { q: "What is the square root of 9?", a: "3" },
    { q: "How many continents are there?", a: "7" },
    { q: "Which gas do humans exhale?", a: "CO2" },
    { q: "What is 10 divided by 2?", a: "5" },
  ];

  // Helper to get a random question
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const updateSquares = (ind) => {
    const idx = Number(ind);
    if (isNaN(idx)) return;
    if (squares[idx] || winner) return;

    // Pick a random question
    const randomQ = getRandomQuestion();
    setActiveQuestion(randomQ);
    setActiveIndex(idx);
    setFeedback("");
  };

  const handleAnswerSubmit = (userAnswer) => {
    if (!activeQuestion || activeIndex === null) return false;

    const correctAnswer = activeQuestion.a.trim().toLowerCase();
    const userAns = (userAnswer || "").trim().toLowerCase();

    if (userAns === correctAnswer) {
      const s = [...squares];
      s[activeIndex] = turn;
      setSquares(s);

      const W = checkWinner(s);
      if (W) setWinner(W);
      else if (checkEndTheGame(s)) setWinner("x | o");
      else setTurn((prev) => (prev === "x" ? "o" : "x"));

      setActiveQuestion(null);
      setActiveIndex(null);
      setFeedback("");
      return true;
    } else {
      setFeedback("❌ Wrong answer! Try again.");
      return false;
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
    setActiveQuestion(null);
    setActiveIndex(null);
    setFeedback("");
  };

  return {
    squares,
    turn,
    winner,
    activeQuestion,
    feedback,
    updateSquares,
    handleAnswerSubmit,
    resetGame,
    setActiveQuestion,
  };
};
