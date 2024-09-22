import { useState, useEffect } from 'react';
import Fish from './Fish';

const createRandomFish = (id) => ({
  id,
  top: Math.floor(Math.random() * 60) + 20 + 'vh',
  left: Math.floor(Math.random() * 800),
});

export const FishTank = () => {
  const [fishes, setFishes] = useState([]);

  // Generate fish positions dynamically
  useEffect(() => {
    const newFishes = Array.from({ length: 5 }, (_, index) =>
      createRandomFish(index)
    );
    setFishes(newFishes);
  }, []);

  return (
    <div>
      {fishes.map((fish) => (
        <Fish key={fish.id} top={fish.top} left={fish.left} />
      ))}
    </div>
  );
};
