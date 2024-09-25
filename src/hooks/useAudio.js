import { useEffect } from "react";

// Music plays on click interaction (modern browser requires some user interaction before playing)
export function useAudio(audioRef, isPlaying, setIsPlaying){
    useEffect(() => {
        const handleClick = () => {
            if(!isPlaying){
                setIsPlaying(true);
                audioRef.current.play();
            }
        };

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isPlaying]);
}