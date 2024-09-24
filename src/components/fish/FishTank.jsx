import { useState, useEffect } from 'react';
import Fish from './Fish';

const minDistance = 100;

const createRandomFish = () => {
  const newFishes = []
  
  for (let i =0; i < 5; i++){
    let top, left
    let isTooClose
    do{
      left = Math.floor(Math.random() * 1000) + 400
      top = Math.floor(Math.random() * 55) + 20
  
      //check distance
      isTooClose = newFishes.some(fish =>{
        const distance = Math.sqrt(Math.pow(left - fish.left, 2) + Math.pow(top - fish.top, 2));
        
        return distance < minDistance 
      })
    }while(isTooClose)


    newFishes.push({id: i, top, left, isColliding: false})
  }
  
  return newFishes
};

export const FishTank = ({fishes, setFishes}) => {
  // const [fishes, setFishes] = useState([]);

  // Generate fish positions dynamically
  useEffect(() => {
    const newFishes = createRandomFish()
    setFishes(newFishes)
  }, []);

  return (
    <div>
      {fishes.map((fish) => (
        <Fish key={fish.id} id={fish.id} top={fish.top} left={fish.left} feed={fish.isColliding} setFishes={setFishes}/>
      ))}
    </div>
  );
};
