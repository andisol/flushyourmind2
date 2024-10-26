import React from "react";

function ThoughtInput({
  thought,
  setThought,
  onTransform,
  inputRef,
  hideText,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onTransform();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Type your thoughts here..."
        ref={inputRef}
        className="thoughtTextArea"
        style={{ visibility: hideText ? "hidden" : "visible" }}
      />
      <button type="submit" disabled={hideText}>
        FLUSH
      </button>
    </form>
  );
}

export default ThoughtInput;
