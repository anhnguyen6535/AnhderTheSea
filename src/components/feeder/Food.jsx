export default function Food({top, left}) {
    return(
        <img 
            src="./oval_food_single.png" 
            style={{
                position: 'absolute',
                transform: 'scale(0.2)',
                top: `${top}px`,
                left: `${left}px`
            }}
        />
    )
}