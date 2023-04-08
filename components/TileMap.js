import React from "react";
import { RoomTypes } from "./RoomTypes";
import { classNames } from "utils";

const TileMap = (props) => {
    const { data, openLocations } = props;

    function getColorByValue(value) {
        const roomType = RoomTypes.find(room => room.value === value);
        return roomType ? value > 131 ? roomType.color2 : roomType.color : roomType.color;
    }

    function getItemByValue(value) {
        const roomType = RoomTypes.find(room => room.value === value);
        return roomType.item ? roomType.item : "";
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
                                <div className={classNames(getItemByValue(cell), openLocations.includes(cell) ? "bg-green-600" : "bg-red-500")}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TileMap;
