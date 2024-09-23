import Feeder from "./Feeder";
import "./feeder.css";
import React, { useState, useEffect, useRef } from 'react';
import Food from "./Food";

export default function FeederGroup() {
    const [foods, setFoods] = useState([])
    const feederRef = useRef()

    const dropFood = () => {
        const feederRect = feederRef.current.getBoundingClientRect()
        const leftPosition = feederRect.left + 25
        const topPosition = feederRect.bottom

        // start dropping a new food
        setFoods(prevFoods => [...prevFoods, { id: Date.now(), left: leftPosition, top: topPosition }])
    }

    useEffect(() => {
        const animateDrop = () => {
            setFoods(prevFoods => {
                return prevFoods.map(food => {
                    const newTop = food.top + 5 // move down by 5px

                    // stop when reaching bottom 
                    return newTop < window.innerHeight ? { ...food, top: newTop } : null
                }).filter(Boolean) // remove null
            })
        }

        // drop every 50ms
        const intervalId = setInterval(animateDrop, 10)
        
        return () => clearInterval(intervalId) 
    }, [foods]) 

    return (
        <div>
            <div style={{ border: 'none' }}>
                <Feeder ref={feederRef} dropFood={dropFood}/>
            </div>
            {/* <button onClick={dropFood}>Drop Food</button> */}
            {foods.map((food, index) => (
                <Food key={index} top = {food.top} left={food.left}/>
            ))}
        </div>
    )
}
