import React from "react";
import { RoomTypes } from "./RoomTypes";
import { RoomTypesS } from "./RoomTypesS";
import { classNames } from "utils";

const SpoilerMap = (props) => {
    const { data, items, randomItems } = props;

    function getColorByValue(value) {
        const roomType = RoomTypes.find(room => room.value === value);
        return roomType ? value > 131 ? roomType.color2 : roomType.color : roomType.color;
    }

    function getItemByValue(value) {
        const room = RoomTypes.find(room => room.value === value);
        if (randomItems === null || items === null) return;
        var test = randomItems[room.name];
        // console.log("Room Test: ", test);
        if (test === undefined) return room.item ? room.item : "";
        const random = RoomTypesS.find(room => room.name === test);
        return random ? random.item : "";
    }

    function getItemNameByValue(value) {
        const roomType = RoomTypes.find(room => room.value === value);
        return roomType.name ? roomType.name : "";
    }

    return (
        <div className="flex-1 p-1">
            <div className="grid grid-cols-16 gap-1">
                {data.map((row, y) => (
                    <div key={y} className="flex gap-1">
                        {row.map((cell, x) => (
                            <div
                                key={`${x},${y}`}
                                title={getItemNameByValue(cell)}
                                className={classNames(getColorByValue(cell), "w-3 h-3")}
                            >
                                <div className={classNames(getItemByValue(cell))}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpoilerMap;
