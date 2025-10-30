
import React, { useEffect, useState } from "react";
import "../styles/loader.css";

interface LoaderProps {
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500); 
    const endTimer = setTimeout(onFinish, 5500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  const letters = "MOVIEFLIX".split("");

  return (
    <div className={`netflix-loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="ribbon"></div>
      <h1 className="logo">
        {letters.map((letter, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};
