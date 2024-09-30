import React, { useState, useEffect } from 'react';
import heart from "../../../public/heart.png";
import heartBlank from "../../../public/heart_blank.png";
import "./fish.css"
import { getFishImage } from './FishHelper';

export default function Fish({id, top, left, feed= false, setFishes, attacked = false}) {
  const [leftPos, setLeft] = useState(left)
  const [direction, setDirection] = useState(1)
  const [fishImg, setFishImg] = useState()
  const [fishSize, setFishSize] = useState('100px');
  const [isAttacked, setIsAttacked] = useState(attacked);

  useEffect(() =>{
    const img = getFishImage()
    setFishImg(img.link)
    setDirection(img.dir)
    setFishSize(img.isPuffFish ? '85px' : '100px')
  },[])

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

  // attacked animation timer
  useEffect(() => {
    if (attacked) {
      setIsAttacked(true);
      setTimeout(() => {
          setIsAttacked(false);
      }, 2000);
    }
  }, [attacked]);

  return (
    <div className='fishDiv' style={{top: `${top}vh`, left: `${leftPos}px`}}>
      <img
        src={feed ? `${heart}` : `${heartBlank}`}
        className="heart"
        alt="Health Bar"
      />
      <img
        src={fishImg}
        // className={`fish-image ${attacked ? 'attacked' : ''} `}
        className='fish-image'
        style={{transform: `scaleX(${direction})`,
          filter: isAttacked ? 'brightness(0.5) invert(1)' : 'none',
          width: fishSize}} // flip horizontally
        alt="Fish"
      />
    </div>
  );
}
