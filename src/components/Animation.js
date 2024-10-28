import React, { useEffect } from "react";
import { gsap } from "gsap";
import Gif1 from "../assets/1.gif";
import Gif2 from "../assets/2.gif";
import Gif3 from "../assets/3.gif";
import Gif4 from "../assets/4.gif";
import Gif5 from "../assets/5.gif";
import Gif6 from "../assets/6.gif";
import Gif7 from "../assets/7.gif";
import Gif8 from "../assets/8.gif";
import Gif9 from "../assets/9.gif";
import Gif10 from "../assets/10.gif";
import Gif11 from "../assets/11.gif";
import Gif12 from "../assets/12.gif";
import Gif13 from "../assets/13.gif";
import Gif14 from "../assets/14.gif";
import Gif15 from "../assets/15.gif";
import Gif16 from "../assets/16.gif";
import Gif17 from "../assets/17.gif";
import Gif18 from "../assets/18.gif";
import Gif19 from "../assets/19.gif";
import Gif20 from "../assets/20.gif";
import Gif21 from "../assets/21.gif";
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
    const gifs = [
      Gif1,
      Gif2,
      Gif3,
      Gif4,
      WindGif,
      Gif5,
      Gif6,
      Gif7,
      Gif8,
      Gif9,
      Gif10,
      Gif11,
      Gif12,
      Gif13,
      Gif14,
      Gif15,
      Gif16,
      Gif17,
      Gif18,
      Gif19,
      Gif20,
      Gif21,
    ];
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
