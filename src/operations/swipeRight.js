import cloneDeep from "lodash.clonedeep";

const swipeRight = (opportunity = null, data, addNewItem, setData, addRecord) => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
        let row = newArray[i];
        let prevValue = row.length - 1;
        let value = prevValue - 1;
        while (prevValue > 0) {
            if (value === -1) {
                value = prevValue - 1;
                prevValue--;
                continue;
            }
            if (row[prevValue] === 0 && row[value] === 0) {
                value--;
            } else if (row[prevValue] === 0 && row[value] !== 0) {
                row[prevValue] = row[value];
                row[value] = 0;
                value--;
            } else if (row[prevValue] !== 0 && row[value] === 0) {
                value--;
            } else if (row[prevValue] !== 0 && row[value] !== 0) {
                if (row[prevValue] === row[value]) {
                    row[prevValue] = row[prevValue] + row[value];
                    addRecord(row[prevValue]);
                    row[value] = 0;
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

export default swipeRight;