import cloneDeep from "lodash.clonedeep";

const swipeUp = (opportunity = null, data, addNewItem, setData, addRecord) => {
    let newArray = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));

    for (let i = 0; i < 4; i++) {
        let prevValue = 0;
        let value = 1;
        while (prevValue < 4) {
            if (value === 4) {
                value = prevValue + 1;
                prevValue++;
                continue;
            }
            if (newArray[prevValue][i] === 0 && newArray[value][i] === 0) {
                value++;
            } else if (newArray[prevValue][i] === 0 && newArray[value][i] !== 0) {
                newArray[prevValue][i] = newArray[value][i];
                newArray[value][i] = 0;
                value++;
            } else if (newArray[prevValue][i] !== 0 && newArray[value][i] === 0) {
                value++;
            } else if (newArray[prevValue][i] !== 0 && newArray[value][i] !== 0) {
                if (newArray[prevValue][i] === newArray[value][i]) {
                    newArray[prevValue][i] = newArray[prevValue][i] + newArray[value][i];
                    addRecord(newArray[prevValue][i]);
                    newArray[value][i] = 0;
                    value = prevValue + 1;
                    prevValue++;
                } else {
                    prevValue++;
                    value = prevValue + 1;
                }
            }
        }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
        addNewItem(newArray);
    }
    if (opportunity) {
        return newArray;
    } else {
        setData(newArray);
    }
};

export default swipeUp;