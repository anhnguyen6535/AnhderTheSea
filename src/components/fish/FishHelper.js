const getRandomDirection = () => {
    return Math.random() < 0.5 ? 1 : -1; 
  };
  
export const getFishImage = () => {
    const id = Math.floor(Math.random() *  4)
    const imgLinks = ["fish.png", "fish8f.png", "fish4.png", "fish8e.png"] 
    const dir = getRandomDirection()

    return { link: imgLinks[id], dir: dir, isPuffFish: id == 1};
}

export const createRandomFish = () => {
  const minDistance = 100;
  const newFishes = []

  // 15 is max num where each fish has its own space
  for (let i =0; i < 15; i++){
    let top, left
    let isTooClose
    let attempts = 0
    const maxAttempts = 200

    do{
      left = Math.floor(Math.random() * 1000) + 500
      top = Math.floor(Math.random() * 60) + 12

      //check distance
      isTooClose = newFishes.some(fish =>{
        const distance = Math.sqrt(Math.pow(left - fish.left, 2) + Math.pow(top - fish.top, 2));
        
        return distance < minDistance 
      })

      attempts ++
    }while(isTooClose && attempts < maxAttempts)


    newFishes.push({id: i, top, left, isColliding: false})
  }
  return newFishes
}