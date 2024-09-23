import "./App.css";
import Feeder from "./components/feeder/Feeder.jsx";
import FeederGroup from "./components/feeder/FeederGroup.jsx";
import { FishTank } from "./components/fish/FishTank.jsx";
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

    return(
        <div className="scene">
            <audio src={bgMusic} ref={audioRef} loop />

            <div className="scene__feeder">
                <FeederGroup />
            </div>
            <div className="scene__tank">
                <FishTank/>
            </div>
        </div>
    )
}