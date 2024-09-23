import "./feeder.css"
import {useEffect, useRef, useState} from "react";
import FeederSVG from "./FeederSVG.jsx";

const Feeder = () => {

    // Checks if player is dragging the shaker
    const [isDragging, setIsDragging] = useState(false);

    // Tracks the x position of the shaker (the left edge of the shaker)
    const [shakerLX, setShakerLX] = useState({ x: 0 });

    // Tracks where in the shaker the player clicked with respect to the left edge
    const [clickPosition, setClickPosition] = useState(0);

    // used to track the feeder div (this way the player can't drag the shaker out of the div)
    const feederRef = useRef(null);

    // track dragging position
    const [dragStart, setDragStart] = useState({ x: 0 });

    // check if the button is clicked
    const [isClick, setIsClick] = useState(false);

    /**
     * When the mouse is pressed set dragging to true. The food shaker is being moved.
     * @param event the mousedown event
     */
    const handleMouseDown = (event) => {
        setIsDragging(true);

        // event.clientX is the x positioning of the mouse click
        // shakerLX.x is the position of the shaker currently (it is the left edge of the shaker)
        // Essentially this determines where in the shaker the player clicked
        // in respect to the left edge
        setClickPosition(event.clientX - shakerLX.x);

        // drag starts where we click the mouse
        setDragStart({ x: event.clientX });
    };

    /**
     * Compute the x coordinate of the shaker.
     * @param event the mousemove event
     */
    const handleMouseMove = (event) => {
        if (!isDragging) return;

        // get the feeder div
        const container = feederRef.current;

        if(container) {
            // this is the dimensions of the container
            const containerRect = container.getBoundingClientRect();

            // Compute where the new x coordinate is.
            // when moving the mouse we get the x coordinate in pixels
            // we need to move the left edge of the shaker,
            // so we need to account for where we clicked within the shaker so
            // subtract the clickPosition from where the mouse pointer is read on the screen
            let newX = event.clientX - clickPosition;

            // Since the button is 100px (this is set in the css)
            // if we take the newX which is the left edge of the button and add 100px we can get the right edge
            let rightEdge = newX + 100;

            if (newX < 0) newX = 0; // Prevent going left

            // if the right edge becomes greater than the container's width we need to remove 100px
            // since the button is 100px
            // if the container is 1000px and the newX which is the left edge is 950px we know that
            // the right edge is 1050px and out of bounds
            // we can just set the left edge to the width of the container - 100 (the size of the button)
            if (rightEdge > containerRect.width) newX = containerRect.width - 100;

            setShakerLX({ x: newX });
        }
    };

    /**
     * When the player release the mouse stop dragging of the food shaker.
     */
    const handleMouseUp = (event) => {
        const epsilon = 5;

        const delta = Math.abs(event.clientX - dragStart.x);

        // epsilon represents the threshold amount that needs to be dragged to consider it dragging
        // if greater it was not a click
        if (delta > epsilon) {
            setIsClick(false);
        } else {
            setIsClick(true);

            // animation is 500ms so set click to false when animation is done (also prevents spamming button)
            setTimeout(() => {
                setIsClick(false);
            }, 500);
        }
        setIsDragging(false);
    };

    // set up event listeners on the component mount and run it when events occur
    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);

        // remove the listeners when not dragging to prevent unintended effects
        // e.g., when moving mouse and not dragging may move the shaker
        // also to prevent accumulation of listeners
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className="feeder-wrapper"
            ref={feederRef}
        >
            <button
                className={`feeder__btn ${isClick ? 'feeder--ani' : ''}`}
                onMouseDown={handleMouseDown}
                style={{ transform: `translateX(${shakerLX.x}px)` }}
            >
                <FeederSVG />
            </button>
        </div>
    )
}

export default Feeder;