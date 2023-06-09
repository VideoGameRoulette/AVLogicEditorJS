import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import path from 'path';
import TileMap from 'components/TileMap.js';
import Powers from 'components/Powers';
import ErrorPage from "components/Errors";

const websocket_endpoint = 'ws://localhost:19906';

export default function Tracker() {
  const [data, setData] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [cPowers, setCPowers] = useState(Powers.None);
  const [openLocations, setLocationOpen] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [currentDiff, setDiff] = useState(null);
  const [connected, setConnected] = useState(false);

  const getOpenLocations = useCallback(() => {
    const availableLocations = [];

    locationData.forEach(location => {
      const powersMatch = location.requiredPowers.some(rp => {
        return (rp & cPowers) === rp;
      });

      if (powersMatch) {
        availableLocations.push(location.id);
      }
    });

    setLocationOpen(availableLocations);
  }, [cPowers, locationData]);

  useEffect(() => {
    if (locationData.length > 0) getOpenLocations();
  }, [cPowers, locationData, getOpenLocations]);


  useEffect(() => {
    console.log('openLocations Updated: ', openLocations);
  }, [openLocations]);

  const handlePresetFile = useCallback((file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const parsedData = reader.result
        .split("\n")
        .filter((row) => row.trim() !== "") // ignore empty lines
        .map((row) => {
          return row.split(",").map((cell) => parseInt(cell));
        });
      setData(parsedData);
    };
  }, [setData]);

  const loadPresetWorld = useCallback(async () => {
    let u = '/maps/World.csv';
    const response = await fetch(u);
    if (!response.ok) {
      // handle error
      return;
    }
    const fileContent = await response.text();
    const fileName = path.basename(u);
    const file = new File([fileContent], fileName);
    handlePresetFile(file);
  }, [handlePresetFile]);

  useEffect(() => {
    loadPresetWorld();
  }, [loadPresetWorld]);

  useEffect(() => {
    const getDifficultyFile = () => {
      if (gameData === null) return;
      switch (gameData.Progression) {
        case 1:
          return '/logic/locations_normal.json';
        case 2:
          return '/logic/locations_hard.json';
        default:
          return '/logic/locations_easy.json';
      }
    };

    if (currentDiff === null) return;
    async function fetchData() {
      const res = await fetch(getDifficultyFile());
      const jsonData = await res.json();
      setLocationData(jsonData);
    }
    fetchData();
  }, [currentDiff, gameData]);

  const handleConnect = useCallback(() => {
    const appendData = data => {
      if (data === null) return;
      const { CurrentPowers, Progression } = data;
      console.log('Websocket Data: ', data);
      setGameData(data);
      setDiff(Progression);
      setCPowers(CurrentPowers);
    };

    const socket = new WebSocket(websocket_endpoint);
    socket.onopen = () => {
      setConnected(true);
    };
    socket.onclose = () => {
      setConnected(false);
    };
    socket.onmessage = event => appendData(JSON.parse(event.data));
  }, [setConnected, setGameData, setDiff, setCPowers]);

  useEffect(() => {
    handleConnect();
  }, [handleConnect]);

  if (gameData === null) return <ErrorPage connected={connected} callback={handleConnect} />;

  return (
    <>
      <Head>
        <title>Logic Map | Axiom Verge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-full bg-gray-100 overflow-hidden">
        <main className="bg-black w-full h-full overflow-auto flex justify-start items-start">
          <TileMap data={data} openLocations={openLocations} />
        </main>
      </div>
    </>
  );
}
