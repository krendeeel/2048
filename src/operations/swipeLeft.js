import cloneDeep from "lodash.clonedeep";

const swipeLeft = (opportunity = null, data, addNewItem, setData, addRecord) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
        let row = newArray[i];
        let prevValue = 0;
        let value = 1;
        while (prevValue < 4) {
            if (value === 4) {
                value = prevValue + 1;
                prevValue++;
                continue;
            }
            if (row[prevValue] === 0 && row[value] === 0) {
                value++;
            } else if (row[prevValue] === 0 && row[value] !== 0) {
                row[prevValue] = row[value];
                row[value] = 0;
                value++;
            } else if (row[prevValue] !== 0 && row[value] === 0) {
                value++;
            } else if (row[prevValue] !== 0 && row[value] !== 0) {
                if (row[prevValue] === row[value]) {
                    row[prevValue] = row[prevValue] + row[value];
                    addRecord(row[prevValue]);
                    row[value] = 0;
                    value = prevValue + 1;
                    prevValue++;
                } else {
                    prevValue++;
                    value = prevValue + 1;
                }
            }
        }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
        addNewItem(newArray);
    }
    if (opportunity) {
        return newArray;
    } else {
        setData(newArray);
    }
};

export default swipeLeft;