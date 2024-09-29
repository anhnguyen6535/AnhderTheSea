import React, {useState, useEffect} from "react";
import paw from "../../../public/paw.png";
import "./paw.css";

export default function Paw({ onHit }) {
    const [state, setState] = useState("invisible"); // State can be 'invisible', 'entering', or 'exiting'
    const [finalPositionStyles, setFinalPositionStyles] = useState({}); // Final position when visible
    const [pawPos, setPawPos] = useState(''); // Track the current position

    const positions = ['left', 'right', 'bottom'];

    const getPawPosition = () => {
        const randomIndex = Math.floor(Math.random() * positions.length);
        return positions[randomIndex];
    };

    // Define baseStyles outside of useEffect
    const baseStyles = {
        position: 'absolute',
        transition: 'all 3s ease-in-out',
    };

    useEffect(() => {
        if (state === "invisible") {
            setPawPos(getPawPosition());
            setState("entering");
        }

        if (state === "entering") {
            let initialStyles = {};
            let finalStyles = {};

            switch (pawPos) {
                case 'left':
                    initialStyles = {
                        left: '-400px',
                        right: 'auto',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(90deg)',
                    };
                    finalStyles = {
                        left: '20px',
                        right: 'auto',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(90deg)',
                    };
                    break;

                case 'right':
                    initialStyles = {
                        left: 'auto',
                        right: '-400px',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(-90deg)',
                    };
                    finalStyles = {
                        left: 'auto',
                        right: '0',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(-90deg)',
                    };
                    break;

                case 'bottom':
                    initialStyles = {
                        left: '50%',
                        right: 'auto',
                        top: 'auto',
                        bottom: '-400px',
                        transform: 'translateX(-50%) rotate(0deg)',
                    };
                    finalStyles = {
                        left: '50%',
                        right: 'auto',
                        top: 'auto',
                        bottom: '-20px',
                        transform: 'translateX(-50%) rotate(0deg)',
                    };
                    break;

                default:
                    break;
            }

            // Apply initial off-screen styles and make visible
            setFinalPositionStyles({ ...baseStyles, ...initialStyles });

            // After a short delay, set to the final position (entry animation)
            const entryTimeout = setTimeout(() => {
                setFinalPositionStyles((prev) => ({ ...prev, ...finalStyles }));
            }, 1000); // Short delay for the effect

            const enteredTimeout = setTimeout(() => {
                onHit(pawPos);
            }, 4000);

            // Set up the exit state to trigger after 1 second of being fully visible
            const exitTimeout = setTimeout(() => {
                setState("exiting");
            }, 5000); // Exit after 1 second of being visible

            // Cleanup timeouts
            return () => {
                clearTimeout(entryTimeout);
                clearTimeout(enteredTimeout);
                clearTimeout(exitTimeout);
            };
        }

        if (state === "exiting") {
            let initialStyles = {};

            switch (pawPos) {
                case 'left':
                    initialStyles = {
                        left: '-400px',
                        right: 'auto',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(90deg)',
                    };
                    break;

                case 'right':
                    initialStyles = {
                        left: 'auto',
                        right: '-400px',
                        top: '50%',
                        bottom: 'auto',
                        transform: 'translateY(-50%) rotate(-90deg)',
                    };
                    break;

                case 'bottom':
                    initialStyles = {
                        left: '50%',
                        right: 'auto',
                        top: 'auto',
                        bottom: '-400px',
                        transform: 'translateX(-50%) rotate(0deg)',
                    };
                    break;

                default:
                    break;
            }

            // Move back off-screen
            setFinalPositionStyles((prev) => ({ ...baseStyles, ...initialStyles }));

            // After exiting is done, set to invisible
            const invisibleTimeout = setTimeout(() => {
                setState("invisible");
            }, 4000); // Duration of exit transition

            // Cleanup timeout
            return () => {
                clearTimeout(invisibleTimeout);
            };
        }
    }, [state, pawPos]);

    // Handle paw click for immediate exit
    const handlePawClick = () => {
        if (state === "entering") {
            // Immediately trigger exit if clicked while entering
            setState("exiting");
        }
    };

    // If the paw isn't visible, don't render it
    if (state === "invisible") return null;


    return (
        <div className="catPawDiv" style={finalPositionStyles} onClick={handlePawClick}>
            <img src={paw} className="cat-paw-image" alt="Cat Paw" />
        </div>
    );

}