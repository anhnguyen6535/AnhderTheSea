import "./App.css";
import FeederGroup from "./components/feeder/FeederGroup.jsx";
import {FishTank} from "./components/fish/FishTank.jsx";
import Paw from "./components/paw/Paw.jsx";
import {useEffect, useRef, useState} from "react";
import bgMusic from "../public/happy-day-in-beach-hand-panwav-14755.mp3"
import { playAudio, useAudio } from "./hooks/useAudio.js";
import videoBG from "../public/background3.mp4"
import hitSound from "../public/Punch Sound.mp3"
import catSound from "../public/angry-cat-hq-sound-effect-2406752.mp3"
import eatSound from "../public/level-up-191997.mp3"

export default function App() {
    const [hitAud] = useState(() => new Audio(hitSound))
    const [catAud] = useState(() => new Audio(catSound))
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    useAudio(audioRef, isPlaying, setIsPlaying)

    const [overlay, setOverlay] = useState(false)

    // State for fish and food
    const [fishes, setFishes] = useState([]);
    let [foods, setFoods] = useState([])

    /**
     * Link to video I used to learn this: https://www.youtube.com/watch?v=r0sy-Cr6WHY
     * Collision logic, detects collision based on hitbox. Each fish and food is a box.
     * @param fish The fish to check
     * @param food The food to check
     * @returns {boolean} true if a collision has occurred
     */
    const checkCollision = (fish, food) => {
        // extend hit box here
        const leftMargin = -50
        const rightMargin = 150 

        const fishLeft = fish.left + leftMargin;
        const fishRight = fish.left + rightMargin; // Fish is 100px (as per Fish.jsx)

        const fishTop = (fish.top * window.innerHeight) / 100;
        const fishBottom = fishTop + 52; // Best guess (from checking elements in console)

        const foodLeft = food.left;
        const foodRight = food.left + 8; // Best guess
        const foodTop = food.top;
        const foodBottom = food.top + 16; // Best guess

        // Hit box collision
        return !(foodLeft > fishRight ||
            foodRight < fishLeft ||
            foodTop > fishBottom ||
            foodBottom < fishTop);
    };

    useEffect(() => {
        const detectCollisions = () => {
            setFishes((prevFishes) =>
                prevFishes.map((fish) => {
                    if (!fish.isColliding) { // Only check if it hasn't already collided
                        const newFoods = [...foods];
                        let collisionDetected = false;

                        for (let i = 0; i < newFoods.length; i++) {
                            const food = newFoods[i];

                            if (checkCollision(fish, food)) {
                                collisionDetected = true;
                                newFoods.splice(i, 1); // remove the food right away so it doesn't collide with another fish
                                setFoods(newFoods);

                                // Fish eat food with a sound
                                playAudio(new Audio(eatSound), 0.5)

                                // no need to check the other food for this fish it has eaten
                                break;
                            }
                        }
                        return { ...fish, isColliding: collisionDetected };
                    }
                    return fish; // just return the fish if a collision already occurred
                })
            );
        };

        detectCollisions();
    }, [foods]);


    // Controls game loop
    
    const [allFull, setAllFull] = useState(false);
    const timeoutRef = useRef(null);
    const [timeToEnd, setTimeToEnd] = useState(8);

    const allFed = () => fishes.length > 0 && fishes.every(fish => fish.isColliding === true);

    useEffect(() => {
        if (allFed()) {
            setAllFull(true);
        } else {
            // if at some point the fish become hungry we cannot end
            setAllFull(false);
            setTimeToEnd(0);
        }
    }, [fishes]);
    
    
    useEffect(() => {
        let intervalRef;
        
        if (allFull) {
            setOverlay(true)
            // only make an interval if one does not yet exist (we don't want to make a bunch of them)
            if (!intervalRef) {
                intervalRef = setInterval(() => {
                    // basically every second we can increment the time to end
                    setTimeToEnd(prev => prev + 1);
                }, 1000);
            }
        } else {
            clearInterval(intervalRef); // we cannot end because not all the fish are full
            setOverlay(false)
        }
        return () => clearInterval(intervalRef);
    }, [allFull]);

    useEffect(() => {
        if (timeToEnd >= 8) {
            // make all fish hungry to restart the game
            fishes.forEach(fish => {
                fish.isColliding = false;
            });
            setTimeToEnd(0); // reset time
        }
    }, [timeToEnd]);


    const handlePawClick = () => {
        if (isPlaying) {
            playAudio(catAud, 0.5)
        }
    }

    const handlePawHit = (pawPos) => {
        if (!audioRef.current.paused) {
            playAudio(hitAud, 0.5)
        }

        setTimeout(() =>{
            setFishes(prevFishes => {
                return prevFishes.map(fish => {
                    // Reset fish in left third, right third, or bottom half
                    if ((pawPos === 'left' && fish.left < window.innerWidth * .33) ||
                        (pawPos === 'right' && fish.left > (window.innerWidth * .66)) ||
                        (pawPos === 'bottom' && fish.top > 50)) {

                        const newFish = { ...fish, isAttacked: true};

                        setTimeout(() => {
                            setFishes((prevFishes) =>
                                prevFishes.map((f) =>
                                    f.id === fish.id ? { ...f, isAttacked: false, isColliding: false } : f
                                )
                            );
                        }, 950);
                        return newFish;
                    }
                    return fish;
                });
            });

        }, 500)
    };

    return(
        <div className="scene">
            <audio src={bgMusic} ref={audioRef} loop />
            <div className={overlay ? "dayNight-overlay" : ""} />

            <div className="scene__feeder">
                <FeederGroup foods={foods} setFoods={setFoods}/>
            </div>
            <div className="scene__tank">
                <video src={videoBG} className="video-bg" autoPlay loop muted />
                <FishTank fishes={fishes} setFishes={setFishes  }/>
                <Paw onHit={handlePawHit} clicked={handlePawClick} />
            </div>
            <div className={`end-countdown ${allFull ? 'end-countdown-ani' : ''}`}>
                Reset: {8 - timeToEnd}
            </div>
        </div>
    )
}