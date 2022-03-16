const checkGameOver = (data, swipeLeft, swipeUp, swipeRight, swipeDown) => {
    let checker = swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(checker)) {
        return false;
    }

    let checker2 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
        return false;
    }

    let checker3 = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
        return false;
    }

    let checker4 = swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
        return false;
    }

    return true;
};

export default checkGameOver;