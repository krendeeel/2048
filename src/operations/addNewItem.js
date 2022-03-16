const addNewItem = newGrid => {
    let added = false;
    while (!added) {
        let coordinateX = Math.floor(Math.random() * 4);
        let coordinateY = Math.floor(Math.random() * 4);
        if (newGrid[coordinateX][coordinateY] === 0) {
            newGrid[coordinateX][coordinateY] = Math.random() > 0.5 ? 2 : 4;
            added = true;
        }
    }
};

export default addNewItem;