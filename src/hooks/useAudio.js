import { useEffect } from "react";

// Music plays on click interaction (modern browser requires some user interaction before playing)
export function useAudio(audioRef, isPlaying, setIsPlaying){
    useEffect(() => {
        const handleClick = () => {
            if(!isPlaying){
                setIsPlaying(true);
                playAudio(audioRef.current, 0.5)
            }
        };

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isPlaying]);
}

export function playAudio(audio, volume){
    audio.volume = volume
    audio.play();
}