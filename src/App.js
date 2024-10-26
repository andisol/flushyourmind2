import React, { useState, useRef } from "react";
import ThoughtInput from "./components/ThoughtInput";
import Animation from "./components/Animation";

function App() {
  const [thought, setThought] = useState(""); // Moved thought state here
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputPosition, setInputPosition] = useState(null);
  const inputRef = useRef(null);

  const resetThought = () => {
    setIsAnimating(false);
    setInputPosition(null);
    setThought(""); // Clear the thought text
  };

  const handleTransform = () => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const position = {
        top: inputRect.top + window.scrollY,
        left: inputRect.left + window.scrollX,
        width: inputRect.width,
        height: inputRect.height,
      };
      setInputPosition(position);
    }
    setIsAnimating(true);
  };

  return (
    <div className="app">
      <h1>FlushYourMind</h1>
      <div className="thoughtInputContainer">
        <ThoughtInput
          thought={thought}
          setThought={setThought}
          onTransform={handleTransform}
          inputRef={inputRef}
          hideText={isAnimating}
        />
      </div>
      {isAnimating && inputPosition && (
        <Animation
          thought={thought}
          onAnimationComplete={resetThought}
          startPosition={inputPosition}
        />
      )}
    </div>
  );
}

export default App;
