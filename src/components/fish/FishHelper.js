const getRandomDirection = () => {
    return Math.random() < 0.5 ? 1 : -1; 
  };
  
export const getFishImage = () => {
    const id = Math.floor(Math.random() * 4)
    const imgLinks = ["fish.png", "fish8.png", "fish4.png", "fish.png"] // since fish.png looks the best, it has 2 chances
    const dir = getRandomDirection()

    return { link: imgLinks[id], dir: dir};
}

export const createRandomFish = () => {
    const minDistance = 100;
    const newFishes = []
    
    for (let i =0; i < 8; i++){
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