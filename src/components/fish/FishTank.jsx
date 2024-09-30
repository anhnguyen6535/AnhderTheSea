import { useEffect, useMemo } from 'react';
import Fish from './Fish';
import { createRandomFish } from './FishHelper';

export const FishTank = ({fishes, setFishes}) => {
  // Generate fish positions dynamically
  useEffect(() => {
    const newFishes = createRandomFish()
    setFishes(newFishes)
  }, []);

  // optimize the rendering of fish components
  const fishComponents = useMemo(() => {
    return fishes.map((fish) => (
      <Fish 
        key={fish.id} 
        id={fish.id} 
        top={fish.top} 
        left={fish.left} 
        feed={fish.isColliding} 
        setFishes={setFishes}
        attacked={fish.isAttacked}
      />
    ));
  }, [fishes,setFishes]); 

  return (
    <div>
      {fishComponents}
    </div>
  );
};
