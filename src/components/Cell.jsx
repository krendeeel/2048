import React from 'react';
import { getColor } from '../utils';

const Cell = ({ number }) => {

    return (
        <div
            className='cell'
            style={{
                background: getColor(number),
                color: number === 2 || number === 4 ? "#645B52" : "#F7F4EF",
            }}
        >
            {number !== 0 ? number : ""}
        </div>
    );
}

export default Cell;