import React, { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";

import { Cell } from ".";
import { useEvent } from "../utils";
import {
    addNewItem,
    checkGameOver,
    swipeLeft,
    swipeRight,
    swipeDown,
    swipeUp
} from "../operations";


const Game = () => {

    const [data, setData] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    const [gameOver, setGameOver] = useState(false);
    const [record, setRecord] = useState(0);


    const addRecord = value => {
        return setRecord(actual => actual + value);
    };

    const toRight = (opportunity = null) => {
        return swipeRight(opportunity, data, addNewItem, setData, addRecord);
    };

    const toLeft = (opportunity = null) => {
        return swipeLeft(opportunity, data, addNewItem, setData, addRecord);
    };

    const toDown = (opportunity = null) => {
        return swipeDown(opportunity, data, addNewItem, setData, addRecord);
    };

    const toUp = (opportunity = null) => {
        return swipeUp(opportunity, data, addNewItem, setData, addRecord);
    };

    const checkDeteat = () => {
        return checkGameOver(data, toLeft, toUp, toRight, toDown);
    };

    const start = () => {
        setGameOver(false);
        setRecord(0);
        const emptyGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        addNewItem(emptyGrid);
        addNewItem(emptyGrid);
        setData(emptyGrid);
    };

    const handleKeyDown = (event) => {
        if (gameOver) {
            return;
        }
        switch (event.keyCode) {
            case 38:
                toUp();
                break;
            case 40:
                toDown();
                break;
            case 37:
                toLeft();
                break;
            case 39:
                toRight();
                break;
            default:
                break;
        }

        let gameOverr = checkDeteat();
        if (gameOverr) {
            setGameOver(true);
        }
    };

    useEffect(() => {
        start();
        // eslint-disable-next-line
    }, []);


    useEvent("keydown", handleKeyDown);

    return (
        <div className="game">
            <div className="game__header">
                <div className="header_title" >2048</div>
                <div className="header_details">
                    <div className="header_record">
                        <span>Cчет</span>
                        <span>{record}</span>
                    </div>
                    <div
                        onClick={start}
                        className="btn btn-newgame">
                        Играть снова
                    </div>
                </div>
            </div>
            <div className="game__main">
                {gameOver && (
                    <div className="main_overlay">
                        <div>
                            <div className="try" > Поражение </div>
                            <div>
                                <div className="reset" >
                                    <div onClick={start} className='btn btn-try'>
                                        <i className="fa fa-refresh"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Swipe
                    onSwipeDown={() => toDown()}
                    onSwipeLeft={() => toLeft()}
                    onSwipeRight={() => toRight()}
                    onSwipeUp={() => toUp()}
                    style={{ overflowY: "hidden" }}
                >
                    {data.map((row, oneIndex) => {
                        return (
                            <div className="main__block" key={oneIndex}>
                                {row.map((digit, index) => (
                                    <Cell number={digit} key={index} />
                                ))}
                            </div>
                        );
                    })}
                </Swipe>
            </div>

            <div className="game__footer">
                <p>
                    <strong>Правила игры:</strong> Используйте клавиши со
                    <strong> стрелками </strong> для перемещения плитки. Плитки
                    с одинаковым номером <strong>сливаются в одну</strong> при соприкосновении.
                    Добавьте их, чтобы достичь <strong>2048!</strong>
                </p>
            </div>
        </div >
    );
}

export default Game;
