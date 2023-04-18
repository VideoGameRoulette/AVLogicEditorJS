import Head from 'next/head';
import { useState, useEffect } from "react";
import { RoomTypesS } from "components/RoomTypesS";
import { classNames } from "utils";
import { ErrorPage } from "components/Errors";

const websocket_endpoint = 'ws://localhost:19906';

const ItemTracker = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(websocket_endpoint);
        socket.onopen = () => socket.send(`listen:videogameroulette`);
        socket.onmessage = event => appendData(JSON.parse(event.data));
    }, []);

    const appendData = d => {
        if (d === null) return;
        setData(d);
        console.log("Websocket Data: ", d);
    };

    if (data === null) return <ErrorPage />;

    const { Items, HealthNodes, HealthNodeFragments, PowerNodes, PowerNodesFragments, SizeNodes, RangeNodes } = data;

    const filteredWeapons = Items?.filter(item => item.mType === 11);
    const filteredTools = Items?.filter(item => item.mType === 10 || item.mType === 5);

    function getItemByValue(value) {
        const room = RoomTypesS.find(room => room.name === value);
        return room.item ? room.item : "";
    }

    return (
        <>
            <Head>
                <title>Item Tracker | Axiom Verge</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="absolute w-full h-full flex">
                <div className="w-72 h-60 flex flex-col border-[16px] border-inner bg-[#240B22]">
                    <div className="w-full flex justify-center text-gray-200 uppercase font-bold">Weapons</div>
                    <div className="w-full h-24 flex flex-wrap content-start" id="items">
                        {filteredWeapons.map(weapon => (
                            <div key={weapon.mName} className="w-8 h-8">
                                <div className={classNames(getItemByValue(weapon.mName))} />
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center text-gray-200 uppercase font-bold">Upgrades</div>
                    <div className="w-full h-16 flex flex-wrap content-start" id="tools">
                        {filteredTools.map(tool => (
                            <div key={tool.mName} className="w-8 h-8">
                                <div className={classNames(getItemByValue(tool.mName))} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-40 h-60 flex flex-wrap border-[16px] border-inner justify-center items-start bg-[#240B22] gap-1">
                    <div className="w-full flex justify-center text-gray-200 uppercase font-bold">PowerUps</div>
                    <div className="w-8 h-8 bg-healthnode" id="healthnode" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="healthnodetext">x{HealthNodes}</div>
                    <div className="w-8 h-8 bg-healthnodefragment" id="healthfragment" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="healthfragmenttext">x{HealthNodeFragments}</div>
                    <div className="w-8 h-8 bg-powernode" id="powernode" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="powernodetext">x{PowerNodes}</div>
                    <div className="w-8 h-8 bg-powernodefragment" id="powerfragment" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="powerfragmenttext">x{PowerNodesFragments}</div>
                    <div className="w-8 h-8 bg-sizenode" id="sizenode" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="sizenodetext">x{SizeNodes}</div>
                    <div className="w-8 h-8 bg-rangenode" id="rangenode" />
                    <div className="h-8 leading-8 font-bold text-gray-200" id="rangenodetext">x{RangeNodes}</div>
                </div>
            </div>
        </>
    );
}

export default ItemTracker;