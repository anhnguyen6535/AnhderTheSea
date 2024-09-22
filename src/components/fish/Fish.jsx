

export default function Fish ({top, left}) {
    
    return<>
        <img 
            src="./fish.png" 
            style={{
                width: '100px',
                height: 'auto',
                position: 'absolute',
                top: top,
                left: left,
            }}
        />
    </>
}