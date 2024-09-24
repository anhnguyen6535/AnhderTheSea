import { useEffect } from 'react';
import Fish from './Fish';
import { createRandomFish } from './FishHelper';

export const FishTank = ({fishes, setFishes}) => {
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
