import cloneDeep from "lodash.clonedeep";

const swipeDown = (opportunity = null, data, addNewItem, setData, addRecord) => {

    let newArray = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
        let prevValue = newArray.length - 1;
        let value = prevValue - 1;
        while (prevValue > 0) {
            if (value === -1) {
                value = prevValue - 1;
                prevValue--;
                continue;
            }
            if (newArray[prevValue][i] === 0 && newArray[value][i] === 0) {
                value--;
            } else if (newArray[prevValue][i] === 0 && newArray[value][i] !== 0) {
                newArray[prevValue][i] = newArray[value][i];
                newArray[value][i] = 0;
                value--;
            } else if (newArray[prevValue][i] !== 0 && newArray[value][i] === 0) {
                value--;
            } else if (newArray[prevValue][i] !== 0 && newArray[value][i] !== 0) {
                if (newArray[prevValue][i] === newArray[value][i]) {
                    newArray[prevValue][i] = newArray[prevValue][i] + newArray[value][i];
                    addRecord(newArray[prevValue][i]);
                    console.log(newArray[prevValue][i]);
                    newArray[value][i] = 0;
                    value = prevValue - 1;
                    prevValue--;
                } else {
                    prevValue--;
                    value = prevValue - 1;
                }
            }
        }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
        addNewItem(newArray);

    }
    if (opportunity) {
        return newArray;
    } else {
        setData(newArray);
    }
};

export default swipeDown;