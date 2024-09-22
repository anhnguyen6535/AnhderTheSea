import React, { useState, useEffect } from 'react';

export default function Fish({ top, left }) {
  const [leftPos, setLeft] = useState(left); 
  const [direction, setDirection] = useState(1); 

  // Fish Animation
  useEffect(() => {
    let animationFrameId;
    const screenWidth = window.innerWidth;
    const fishWidth = 100;

    const moveFish = () => {
      setLeft((prevLeft) => {
        const newLeft = prevLeft + direction * 2; // Move by 2px each frame
        // If the fish hits the right or left boundary, reverse direction
        if (newLeft + fishWidth >= screenWidth || newLeft <= 0) {
          setDirection((prevDirection) => -prevDirection); 
        }
        return newLeft;
      });

      animationFrameId = requestAnimationFrame(moveFish); // Continue animation
    };

    animationFrameId = requestAnimationFrame(moveFish); // Start the animation

    return () => cancelAnimationFrame(animationFrameId); // Cleanup
  }, [direction]); 

  return (
    <img 
      src="./fish.png" 
      style={{
        width: '100px',
        height: 'auto',
        position: 'absolute',
        top: top,
        left: `${leftPos}px`, 
        transform: `scaleX(${direction})`, // Flip fish horizontally
      }}
    />
  );
}
