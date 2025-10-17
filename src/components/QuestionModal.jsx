import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuestionModal = ({ questionObj, feedback, onSubmit, onClose }) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer("");
  }, [questionObj]);

  if (!questionObj) return null;

  const handleSubmit = () => {
    const ok = onSubmit(answer);
    if (ok) setAnswer("");
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-3xl shadow-xl border border-gray-600 w-[380px] text-center"
        >
         <h2 style={{ color: "#FACC15" }} className="text-lg font-bold mb-4 drop-shadow-md">
  🧠 Answer to Unlock
</h2>

<p style={{ color: "#E5E7EB" }} className="mb-5 leading-relaxed">
  {questionObj.q}
</p>


          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none mb-4 transition"
          />

          {feedback && (
            <p className="text-red-400 text-sm mb-3">{feedback}</p>
          )}

          <div className="flex justify-center gap-4 mt-3">
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-xl font-semibold transition shadow-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-gray-200 px-6 py-2 rounded-xl transition font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="absolute -top-3 -right-3 bg-yellow-500 text-gray-900 rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
            Quiz
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionModal;
