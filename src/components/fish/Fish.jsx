import React, { useState, useEffect } from 'react';
import fishIMG from "../../../public/fish.png";
import heart from "../../../public/heart.png";
import heartBlank from "../../../public/heart_blank.png";

export default function Fish({id, top, left, feed= false, setFishes}) {
  const [leftPos, setLeft] = useState(left) 
  const [direction, setDirection] = useState(1)

  // Fish Animation
  useEffect(() => {
    let animationFrameId
    const screenWidth = window.innerWidth
    const fishWidth = 100

    const moveFish = () => {
      setLeft((prevLeft) => {
        const newLeft = prevLeft + direction * 2 // move by 2px each frame
        // if the fish hits the right or left boundary, reverse direction
        if (newLeft + fishWidth >= screenWidth || newLeft <= 0) {
          setDirection((prevDirection) => -prevDirection)
        }

        return newLeft
      })

      animationFrameId = requestAnimationFrame(moveFish) // continue anim
    }

    animationFrameId = requestAnimationFrame(moveFish) // start anim

    return () => cancelAnimationFrame(animationFrameId)
  }, [direction]);

  // Update the parent state only when leftPos changes
  useEffect(() => {
    setFishes((prevFishes) =>
      prevFishes.map((fish) =>
        fish.id === id ? { ...fish, left: leftPos } : fish
      )
    );
  }, [leftPos, id, setFishes]);

  return (
    <div style={{
        position: 'absolute',
        top: `${top}vh`, left: `${leftPos}px`,
        WebkitUserDrag: 'none',
        userDrag: 'none',
        pointerEvents: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
    }}>
      <img 
        src={feed ? `${heart}` : `${heartBlank}`}
        className="heart"
        style={{
          width: '50px',
          height: 'auto',
          position: 'absolute',
          bottom: '100%',
          left: '25%',
        }}
        alt="Health Bar"
      />
      <img 
        src={fishIMG}
        style={{
          width: '100px',
          height: 'auto',
          position: 'relative',
          transform: `scaleX(${direction})`, // flip horizontally
        }}
        alt="Fish"
      />
    </div>
  );
}
