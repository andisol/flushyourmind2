import React, { useEffect } from "react";
import { gsap } from "gsap";
import ExplosionGif from "../assets/kitty-cat.gif";
import FireGif from "../assets/mariposas.gif";
import TrashGif from "../assets/pmd-pmdtechnologies.gif";
import WaterDropGif from "../assets/yellow-butterfly-pixel-art.gif";
import WindGif from "../assets/wind2.gif";

function Animation({ thought, onAnimationComplete, startPosition }) {
  useEffect(() => {
    if (!startPosition) return;

    const appElement = document.body;
    const thoughtContainer = document.createElement("div");
    thoughtContainer.className = "animatedThoughtContainer";

    appElement.appendChild(thoughtContainer);

    // Split the thought into individual characters
    const characters = thought.split("");
    const charElements = [];

    characters.forEach((char) => {
      const charElement = document.createElement("span");
      charElement.className = "animatedChar";
      charElement.innerText = char;
      thoughtContainer.appendChild(charElement);
      charElements.push(charElement);
    });

    // Set initial styles for the container
    gsap.set(thoughtContainer, {
      position: "fixed",
      top: startPosition.top,
      left: startPosition.left,
      width: startPosition.width,
      height: startPosition.height,
      overflow: "hidden",
      padding: "10px",
      boxSizing: "border-box",
      fontSize: "16px",
      fontFamily: "Pix, monospace",
      color: "black",
      backgroundColor: "white",
      zIndex: 100,
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",
    });

    // Animate characters to the center
    gsap.to(charElements, {
      duration: 1,
      x: (i, target) => {
        const rect = target.getBoundingClientRect();
        const parentRect = thoughtContainer.getBoundingClientRect();
        return (
          parentRect.left + parentRect.width / 2 - rect.left - rect.width / 2
        );
      },
      y: (i, target) => {
        const rect = target.getBoundingClientRect();
        const parentRect = thoughtContainer.getBoundingClientRect();
        return (
          parentRect.top + parentRect.height / 2 - rect.top - rect.height / 2
        );
      },
      opacity: 0,
      ease: "power2.in",
      stagger: 0.02,
      onComplete: () => {
        thoughtContainer.remove();
        playGifAnimation(appElement, startPosition, onAnimationComplete);
      },
    });

    // Cleanup on unmount
    return () => {
      thoughtContainer.remove();
      gsap.killTweensOf(charElements); // Kill any ongoing animations
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const playGifAnimation = (appElement, position, onComplete) => {
    // List of GIFs to choose from
    const gifs = [ExplosionGif, FireGif, TrashGif, WaterDropGif, WindGif];
    const gifSrc = gifs[Math.floor(Math.random() * gifs.length)];

    const gifElement = document.createElement("img");
    gifElement.src = gifSrc;
    gifElement.className = "animationGif";

    appElement.appendChild(gifElement);

    // Position the GIF at the center point
    gsap.set(gifElement, {
      position: "fixed",
      top: position.top + position.height / 2,
      left: position.left + position.width / 2,
      xPercent: -50,
      yPercent: -50,
      zIndex: 100,
    });

    // Display the GIF for its duration
    const delayedCall = gsap.delayedCall(2, () => {
      gifElement.remove();
      onComplete();
    });

    // Cleanup function to prevent multiple GIFs
    return () => {
      gifElement.remove();
      delayedCall.kill();
    };
  };

  return null; // No need to render anything
}

export default Animation;
