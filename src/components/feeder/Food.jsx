import foodImg from "../../../public/oval_food_single.png"

export default function Food({top, left}) {
    return(
        <img
            src={foodImg}
            style={{
                position: 'absolute',
                transform: 'scale(0.2)',
                top: `${top}px`,
                left: `${left}px`
            }}
         alt=''
        />
    )
}