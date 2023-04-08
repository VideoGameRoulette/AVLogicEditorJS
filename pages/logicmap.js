import { useState, useEffect } from 'react';
import Head from 'next/head';
import TileMap from 'components/TileMap.js';
import path from 'path';

// Simulated Power Flags
export const Powers = {
  None: 0,
  Gun: 1 << 0,
  Nova: 1 << 1,
  Drill: 1 << 2,
  Kilver: 1 << 3,
  AddressDisruptor1: 1 << 4,
  HighJump: 1 << 5,
  Labcoat: 1 << 6,
  Drone: 1 << 7,
  AddressDisruptor2: 1 << 8,
  Grapple: 1 << 9,
  Trenchcoat: 1 << 10,
  AddressBombs: 1 << 11,
  DroneTeleport: 1 << 12,
  ExtendedDroneLaunch: 1 << 13,
  SudranKey: 1 << 14,
  RedCoat: 1 << 15,
  Password: 1 << 16,
  LongKilver: 1 << 17,
  FatBeam: 1 << 18,
  TeleReset: 1 << 19,

  // Helper functions
  hasPower(powers, power) {
    return (powers & power) === power;
  },

  addPower(powers, power) {
    return powers | power;
  },

  removePower(powers, power) {
    return powers & ~power;
  }
};

const websocket_endpoint = "ws://localhost:19906";

export default function Map() {
  const [data, setData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [cPowers, setCPowers] = useState(Powers.None);
  const [openLocations, setLocationOpen] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [currentDiff, setDiff] = useState(null);

  useEffect(() => {
    if (locationData.length > 0) getOpenLocations();
  }, [cPowers]);

  useEffect(() => {
    console.log("locationData Updated: ", locationData);
    getOpenLocations();
  }, [locationData]);

  useEffect(() => {
    console.log("openLocations Updated: ", openLocations);
  }, [openLocations]);

  const handlePresetFile = (file) => {
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
  };

  const loadPresetWorld = async () => {
    const response = await fetch('maps/World.csv');
    if (!response.ok) {
      // handle error
      return;
    }
    const fileContent = await response.text();
    const fileName = path.basename('maps/World.csv');
    const file = new File([fileContent], fileName);
    handlePresetFile(file);
  };

  useEffect(() => {
    loadPresetWorld();
  }, []);

  const getDifficultyFile = () => {
    if (gameData === null) return;
    switch (gameData.Progression) {
      case 1: return "logic/locations_normal.json";
      case 2: return "logic/locations_hard.json";
      default: return "logic/locations_easy.json";
    }
  }

  useEffect(() => {
    if (currentDiff === null) return;
    async function fetchData() {
      const res = await fetch(getDifficultyFile());
      const jsonData = await res.json();
      setLocationData(jsonData);
    }
    fetchData();
  }, [currentDiff]);

  useEffect(() => {
    const socket = new WebSocket(websocket_endpoint);
    socket.onopen = () => socket.send(`listen:videogameroulette`);
    socket.onmessage = (event) => appendData(JSON.parse(event.data));
  }, [])

  const appendData = (data) => {
    if (data === null) return;
    const { CurrentPowers, Progression } = data;
    console.log("Websocket Data: ", data);
    setGameData(data);
    setDiff(Progression);
    setCPowers(CurrentPowers);
  }

  function getOpenLocations() {
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
  }

  return (
    <>
      <Head>
        <title>Axiom Verge Logic Tester</title>
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
  )
}
