import SpoilerMap from 'components/SpoilerMap.js';
import Head from 'next/head';
import path from 'path';
import { useState, useEffect } from 'react';

const isDev = process.env.NODE_ENV !== 'production';

const websocket_endpoint = 'ws://localhost:19906';

export default function Spoilers() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState(null);
  const [randomItems, setRandomItems] = useState(null);

  const handlePresetFile = file => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const parsedData = reader.result
        .split('\n')
        .filter(row => row.trim() !== '') // ignore empty lines
        .map(row => {
          return row.split(',').map(cell => parseInt(cell));
        });
      setData(parsedData);
    };
  };

  const loadPresetWorld = async () => {
    let u = isDev ? '/maps/World.csv' : '/AVLogicEditorJS/maps/World.csv';
    const response = await fetch(u);
    if (!response.ok) {
      // handle error
      return;
    }
    const fileContent = await response.text();
    const fileName = path.basename(u);
    const file = new File([fileContent], fileName);
    handlePresetFile(file);
  };

  useEffect(() => {
    loadPresetWorld();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(websocket_endpoint);
    socket.onopen = () => socket.send(`listen:videogameroulette`);
    socket.onmessage = event => appendData(JSON.parse(event.data));
  }, []);

  const appendData = data => {
    if (data === null) return;
    const { Items, RandomItems } = data;
    setItems(Items);
    setRandomItems(RandomItems);
  };

  return (
    <>
      <Head>
        <title>Spoiler Map | Axiom Verge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-full bg-gray-100 overflow-hidden">
        <main className="bg-black w-full h-full overflow-auto flex justify-start items-start">
          <SpoilerMap data={data} items={items} randomItems={randomItems} />
        </main>
      </div>
    </>
  );
}
