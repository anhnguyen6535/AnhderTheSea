import React, { useState, useEffect } from "react";
import paw from "../../../public/paw.png";
import "./paw.css";

export default function Paw({ onHit }) {
    const [state, setState] = useState("invisible"); // State can be 'invisible', 'entering', or 'exiting'
    const [finalPositionStyles, setFinalPositionStyles] = useState({}); // Final position when visible
    const [pawPos, setPawPos] = useState(''); // Track the current position
    const [styles, setStyles] = useState({
        initialStyles: {},
        finalStyles: {},
    })

    const positions = ['left', 'right', 'bottom'];

    // Define baseStyles outside of useEffect
    const baseStyles = {
        position: 'absolute',
        transition: 'all 3s ease-in-out',
    };

    // Function to get a random paw position
    const getPawPosition = () => {
        const randomIndex = Math.floor(Math.random() * positions.length);
        return positions[randomIndex];
    };

    const feederHeight = 150;
    const pawHeight = 150;
    const rotationHeight = 75; // since the image was rotated the center is shifted down 75px

    const minTop = -rotationHeight; // shifting down the center need to reshift it up with respect to the tank
    const maxTop = window.innerHeight - pawHeight - feederHeight - rotationHeight; // the max top value

    const getStyles = (position) => {
        let initialStyles = {};
        let finalStyles = {};

        switch (position) {
            case 'left':
                const leftTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
                initialStyles = {
                    left: '-400px',
                    top: `${leftTop}px`,
                    transform: 'rotate(90deg)',
                };
                finalStyles = {
                    left: '20px',
                    top: `${leftTop}px`,
                    transform: 'rotate(90deg)',
                };
                break;

            case 'right':
                const rightTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
                initialStyles = {
                    left: 'auto',
                    right: '-400px',
                    top: `${rightTop}px`,
                    // top: `-75px`,
                    transform: 'rotate(-90deg)',
                };
                finalStyles = {
                    left: 'auto',
                    right: '0',
                    top: `${rightTop}px`,
                    // top: `-75px`,
                    transform: 'rotate(-90deg)',
                };
                break;

            case 'bottom':
                // Random gives a number between 0 inclusive and 1 exclusive
                // We get the width of the window and subtract the width of the cat paw
                // We get a random number between 0 and the window width - the cat paw to use as the start
                // of the cat paw
                const bottomLeft = Math.floor(Math.random() * (window.innerWidth - 175));
                initialStyles = {
                    left: `${bottomLeft}px`,
                    bottom: '-400px',
                    transform: 'rotate(0deg)',
                };
                finalStyles = {
                    left: `${bottomLeft}px`,
                    bottom: '-20px',
                    transform: 'rotate(0deg)',
                };
                break;

            default:
                break;
        }

        return { initialStyles, finalStyles };
    };

    // Enter
    const entering = () => {

        // Apply initial off-screen styles and make visible
        setFinalPositionStyles({ ...baseStyles, ...styles.initialStyles });

        // After a short delay, set to the final position (entry animation)
        const entryTimeout = setTimeout(() => {
            setFinalPositionStyles((prev) => ({ ...prev, ...styles.finalStyles }));
        }, 1000);

        // // Trigger onHit callback
        // const enteredTimeout = setTimeout(() => {
        //     onHit(pawPos);
        // }, 4000);

        // Set up the exit state to trigger after 1 second of being fully visible
        const exitTimeout = setTimeout(() => {
            setState("exiting");
        }, 5000);

        return () => {
            clearTimeout(entryTimeout);
            // clearTimeout(enteredTimeout);
            clearTimeout(exitTimeout);
        };
    };

    // exit
    const exiting = () => {
        // Move back off-screen
        setFinalPositionStyles((prev) => ({ ...baseStyles, ...styles.initialStyles, transition: 'all 1s ease-in-out' }));

        // After exiting is done, set to invisible
        const invisibleTimeout = setTimeout(() => {
            setState("invisible");
        }, 4000); // Duration of exit transition

        return () => {
            clearTimeout(invisibleTimeout);
        };
    };

    useEffect(() => {
        if (state === "invisible") {
            const newPosition = getPawPosition();
            setPawPos(newPosition);

            const { initialStyles, finalStyles } = getStyles(newPosition);
            setStyles({ initialStyles, finalStyles });

            setState("entering");
        }

        if (state === "entering") {
            return entering();
        }

        if (state === "exiting") {
            return exiting();
        }
    }, [state, pawPos, styles]);

    const [isShaking, setIsShaking] = useState(false);

    // Handle paw click for immediate exit
    const handlePawClick = () => {
        if (state === "entering") {
            onHit(pawPos);
            setState("exiting");

            setIsShaking(true);

            // set shaking to false when the animation ends
            setTimeout(() => {
                setIsShaking(false);
            }, 500); // remove at same duration as animation
        }
    };

    // If the paw isn't visible, don't render it
    if (state === "invisible") return null;

    return (
        <div className="catPawDiv" style={finalPositionStyles} onClick={handlePawClick}>
            <img
                src={paw}
                className={`cat-paw-image ${isShaking ? "shake" : ""}`}
                alt="Cat Paw"
            />
        </div>
    );
}
