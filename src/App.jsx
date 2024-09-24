import "./App.css";
import FeederGroup from "./components/feeder/FeederGroup.jsx";
import {FishTank} from "./components/fish/FishTank.jsx";
import {useEffect, useRef, useState} from "react";
import bgMusic from "../public/happy-day-in-beach-hand-panwav-14755.mp3"

export default function App() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Music plays on click interaction (modern browser requires some user interaction before playing)
    useEffect(() => {
        const handleClick = () => {
            if(!isPlaying){
                setIsPlaying(true);
                const audio = audioRef.current;
                audio.play()
                    .then(() => console.log("Playing"))
                    .catch((error) => console.error(error));
            }
        };

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isPlaying]);

    // State for fish and food
    const [fishes, setFishes] = useState([]);
    let [foods, setFoods] = useState([])

    /**
     * Collision logic, detects collision based on hitbox. Each fish and food is a box.
     * @param fish The fish to check
     * @param food The food to check
     * @returns {boolean} true if a collision has occurred
     */
    const checkCollision = (fish, food) => {
        const fishLeft = fish.left;
        const fishRight = fish.left + 100; // Fish is 100px (as per Fish.jsx)

        // When I logged the value it was something like 30vh60 I need the same units
        // So I check if it is a string. If it is a string I parse it to a float to just get the number
        // then I convert it to px
        // not a string I can just use the value
        const fishTop = typeof fish.top === 'string' ? (parseFloat(fish.top) * window.innerHeight / 100) : fish.top;
        const fishBottom = fishTop + 52; // Best guess (from checking elements in console)

        const foodLeft = food.left;
        const foodRight = food.left + 8; // Best guess
        const foodTop = food.top;
        const foodBottom = food.top + 16; // Best guess

        // Hit box collision
        return !(fishRight < foodLeft ||
            fishLeft > foodRight ||
            fishBottom < foodTop ||
            fishTop > foodBottom);
    };

    useEffect(() => {
        const detectCollisions = () => {
            setFishes((prevFishes) =>
                prevFishes.map((fish) => {
                    if (!fish.isColliding) { // Only check if it hasn't already collided
                        const newFoods = [];
                        let collisionDetected = false;

                        for (const food of foods) {
                            if (checkCollision(fish, food)) {
                                collisionDetected = true;
                            } else {
                                newFoods.push(food);
                            }
                        }
                        if (collisionDetected) {
                            setFoods(newFoods);
                        }
                        return { ...fish, isColliding: collisionDetected || fish.isColliding };
                    }
                    return fish; // Return unchanged fish if it already collided
                })
            );
        };

        detectCollisions();
    }, [foods]);

    return(
        <div className="scene">
            <audio src={bgMusic} ref={audioRef} loop />

            <div className="scene__feeder">
                <FeederGroup foods={foods} setFoods={setFoods}/>
            </div>
            <div className="scene__tank">
                <FishTank fishes={fishes} setFishes={setFishes}/>
            </div>
        </div>
    )
}