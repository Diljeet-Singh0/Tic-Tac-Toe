
import { useState } from "react";
import { checkWinner, checkEndTheGame } from "../utils/gameLogic";

export const useTicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [feedback, setFeedback] = useState("");

  const allQuestions = [
    { q: "The company that made ChatGPT", a: "openai" },
    { q: "File format commonly used for datasets", a: "csv" },
    { q: "A model that generates text or images based on input prompts is called ", a: "generative ai" },
    { q: "The ratio of correct predictions to total predictions is known as ", a: "accuracy" },
    { q: "20. The full form of API is ____. A) Application Programming Interface B) Artificial Program Intelligence C) Active Process Interface D) Applied Programming Interaction", a: "a" },
    { q: "13. A visual chart used to represent data frequency is a ____.", a: "histogram" },
    { q: "What is the full form of NLP in Artificial Intelligence? A) Neural Learning Process B) Natural Language Processing C) Network Logic Programming D) Numerical Logic Prediction", a: "b" },
    { q: "Learning method in which models are trained on labeled data is called ____. A) Supervised Learning B) Unsupervised Learning C) Reinforcement Learning D) Transfer Learning", a: "a" },
    { q: "A collection of related data stored in an organized form is a ____.", a: "dataset" },  ];

  // Track which questions are left (not yet used)
  const [availableQuestions, setAvailableQuestions] = useState(allQuestions);

  // Helper to get a random *unused* question
  const getRandomQuestion = () => {
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selected = availableQuestions[randomIndex];
    const remaining = availableQuestions.filter((_, i) => i !== randomIndex);
    setAvailableQuestions(remaining);
    return selected;
  };

  // Store question assigned to each square
  const [questionMap, setQuestionMap] = useState({}); // e.g. {0: {q, a}, 4: {q, a}}

  const updateSquares = (ind) => {
    const idx = Number(ind);
    if (isNaN(idx)) return;
    if (squares[idx] || winner) return;

    // ✅ If this box already has a question assigned, reuse it
    if (questionMap[idx]) {
      setActiveQuestion(questionMap[idx]);
      setActiveIndex(idx);
      setFeedback("");
      return;
    }

    // ✅ Otherwise, pick a new random unused question
    const randomQ = getRandomQuestion();
    if (!randomQ) {
      setFeedback("No more questions left!");
      return;
    }

    // Save it to map so it doesn’t change on future clicks
    setQuestionMap((prev) => ({ ...prev, [idx]: randomQ }));

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
    setQuestionMap({});
    setAvailableQuestions(allQuestions); // reset question pool
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
 

