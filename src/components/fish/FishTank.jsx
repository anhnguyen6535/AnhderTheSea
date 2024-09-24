import { useState, useEffect } from 'react';
import Fish from './Fish';

const minDistance = 50;

const createRandomFish = (id) => ({
  id,
  top: Math.floor(Math.random() * 55) + 20,
  left: Math.floor(Math.random() * 1000) + 400,
  isColliding: false,
});

export const FishTank = ({fishes, setFishes}) => {
  // const [fishes, setFishes] = useState([]);

  // Generate fish positions dynamically
  useEffect(() => {
    const newFishes = Array.from({ length: 10 }, (_, index) =>
      createRandomFish(index)
    );
    setFishes(newFishes);
  }, []);

  return (
    <div>
      {fishes.map((fish) => (
        <Fish key={fish.id} id={fish.id} top={fish.top} left={fish.left} feed={fish.isColliding} setFishes={setFishes}/>
      ))}
    </div>
  );
};
