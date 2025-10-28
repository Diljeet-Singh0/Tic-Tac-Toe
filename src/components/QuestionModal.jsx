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

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    },
    modal: {
      background: "linear-gradient(135deg, #1f2937, #374151)",
      padding: "2rem",
      borderRadius: "20px",
      width: "380px",
      textAlign: "center",
      color: "#E5E7EB",
      border: "1px solid #4B5563",
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
      position: "relative",
    },
    title: {
      color: "#FACC15",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
      letterSpacing: "0.5px",
    },
    question: {
      fontSize: "1rem",
      marginBottom: "1.2rem",
      lineHeight: "1.6",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      backgroundColor: "#374151",
      color: "#F9FAFB",
      border: "1px solid #4B5563",
      outline: "none",
      fontSize: "0.95rem",
      marginBottom: "0.8rem",
      transition: "0.3s",
    },
    feedback: {
      color: "#F87171",
      fontSize: "0.85rem",
      marginBottom: "0.8rem",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "0.5rem",
    },
    buttonPrimary: {
      backgroundColor: "#FACC15",
      color: "#111827",
      padding: "10px 18px",
      borderRadius: "10px",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      transition: "0.25s",
      boxShadow: "0 4px 10px rgba(250, 204, 21, 0.4)",
    },
    buttonPrimaryHover: {
      backgroundColor: "#EAB308",
    },
    buttonSecondary: {
      backgroundColor: "#4B5563",
      color: "#E5E7EB",
      padding: "10px 18px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      transition: "0.25s",
    },
    badge: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      backgroundColor: "#FACC15",
      color: "#111827",
      borderRadius: "20px",
      padding: "4px 10px",
      fontSize: "0.75rem",
      fontWeight: "600",
      boxShadow: "0 3px 8px rgba(250,204,21,0.5)",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={styles.overlay}
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={styles.modal}
        >
          <h2 style={styles.title}>🧠 Answer to Unlock</h2>

          <p style={styles.question}>{questionObj.q}</p>

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #FACC15")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #4B5563")
            }
          />

          {feedback && <p style={styles.feedback}>{feedback}</p>}

          <div style={styles.buttonRow}>
            <button
              style={styles.buttonPrimary}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#EAB308")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#FACC15")
              }
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              style={styles.buttonSecondary}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#6B7280")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#4B5563")
              }
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

          <div style={styles.badge}>Quiz</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionModal;
