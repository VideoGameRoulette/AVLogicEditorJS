import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import { MainContainer, SecondaryContainer } from 'components/Containers';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { classNames } from 'utils';
import HeaderButton from 'components/HeaderButton';

// Simulated Power Flags
const Powers = {
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

export default function Home() {
  const [locations, setLocations] = useState(null);
  const [current, setCurrent] = useState(null);
  const [pIndex, setPIndex] = useState(null);
  const [powers, setPowers] = useState(null);

  useEffect(() => {
    if (current === null) return;
    const newData2 = locations;

    newData2.map((location, idx) => {
      if (location.id === current.id)
        newData2[idx] = current;
    });
    setLocations(newData2);
  }, [current]);

  // Handle for saving json file
  function downloadLogicFile(data) {
    const filename = "locations_custom.json";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  }

  // Handle for File Input Button
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !(file instanceof Blob)) {
      // handle error
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setLocations(data);
      } catch (error) {
        // handle error
      }
    };
  };

  // Create Power Objects for Checkboxes
  function createPowerObjects(p) {
    const powerObjects = [];

    for (const [key, value] of Object.entries(Powers)) {
      if (typeof value === 'number' && value !== 0) {
        powerObjects.push({
          power: key,
          value: value,
          checked: Powers.hasPower(p, value)
        });
      }
    }

    return powerObjects;
  }

  // Handles Power Checkbox Click
  const handleClickPowers = (p, idx) => {
    setPIndex(idx);
    setPowers(createPowerObjects(p));
  };

  // Handles Location Click
  const handlePowerClick = (value) => {
    var newData = current.requiredPowers;
    var c = newData[pIndex];
    var n = Powers.hasPower(c, value) ? Powers.removePower(c, value) : Powers.addPower(c, value);
    newData[pIndex] = n;
    setCurrent(prev => ({ ...prev, requiredPowers: newData }));
    var newPowers = powers;
    newPowers.map(p => {
      if (p.value === value)
        p.checked = !p.checked;
    });
    setPowers(newPowers);
  };

  // Handles Location Click
  const handleItemClick = (location) => {
    setCurrent(location);
    setPowers(null);
    setPIndex(null);
  }

  function getFlagStrings(flags) {
    const flagStrings = [];
    for (const [key, value] of Object.entries(Powers)) {
      if (typeof value === 'number' && value !== 0 && (flags & value) === value) {
        flagStrings.push(`${key}, `);
      }
    }
    if (flagStrings.length === 0) return ["None"];
    flagStrings[flagStrings.length - 1] = flagStrings[flagStrings.length - 1].split(',')[0];
    return flagStrings;
  }

  function getItemNameForImage(mName) {
    if (mName.includes("HealthNode")) {
      if (mName.endsWith("Fragment")) return "HealthNodeFragment";
      return "HealthNode";
    }
    if (mName.includes("PowerNode")) {
      if (mName.endsWith("Fragment")) return "PowerNodeFragment";
      return "PowerNode";
    }
    if (mName.includes("SizeNode"))
      return "SizeNode";
    if (mName.includes("RangeNode"))
      return "RangeNode";
    if (mName.includes("Note"))
      return "Note";
    return mName;
  }

  const handlePowerAdd = () => {
    const { requiredPowers } = current;
    const newData = [...requiredPowers, Powers.None];
    setCurrent(prev => ({ ...prev, requiredPowers: newData }));
  };

  const handlePowerRemove = (powers) => {
    const { requiredPowers } = current;
    const filtered = requiredPowers.filter(e => e !== powers);
    console.log("Filter: ", filtered);
    setCurrent(prev => ({ ...prev, requiredPowers: filtered }));
  };

  return (
    <>
      <Head>
        <title>Axiom Verge Logic Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-full bg-gray-100 overflow-hidden">
        <MainContainer>
          <Header title="Axiom Verge Logic Editor" version="0.0.1">
            <div className="w-1/8 h-full flex gap-2 justify-center items-center">
              <HeaderButton title="Items" url="/items" active={false} />
              <HeaderButton title="Locations" url="/locations" active={true} />
              <HeaderButton title="Tracker" url="/map/tracker" active={false} />
              <HeaderButton title="Debugger" url="/map/debugger" active={false} />
            </div>
          </Header>
          <SecondaryContainer>
            {/* Left Container */}
            <nav className="hidden xl:block bg-gray-900 text-white w-full h-full overflow-hidden flex flex-col p-2">
              {/* Load and Save Buttons */}
              <div className="w-full flex gap-2 mb-2 bg-gray-900">
                <label htmlFor="fileInput" className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-center">
                  Load
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".json"
                />
                <button className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-center" onClick={() => downloadLogicFile(locations)}>
                  Save
                </button>
              </div>
              {/* Location List */}
              <ul role="list" className="h-[55rem] flex flex-col gap-2 overflow-y-auto scrollbar-hide">
                {locations?.map((location) => (
                  <li key={location.name} className={classNames(location.name === current?.name ? "bg-sky-500 text-black" : "bg-gray-800 hover:bg-gray-700 text-gray-200", "flex p-4 cursor-pointer")} onClick={() => handleItemClick(location)}>
                    <img className="h-10 w-10 rounded-full" src={`imgs/${getItemNameForImage(location.name)}.svg`} alt="" />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{location.name}</p>
                      <p className="text-sm">{location.id}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Right Container */}
            <main className="bg-gray-800 w-full h-full overflow-y-auto grid-rows-[4rem_1fr]">
              {/* Header Title and Add / Remove Buttons */}
              <div className="w-full h-16 flex justify-between items-center bg-gray-700">
                <h1 className="font-bold text-xl text-gray-200 p-4">{current?.name}</h1>
                <div className="flex items-center justify-end pr-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l flex items-center"
                    onClick={() => handlePowerAdd()}
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r flex items-center"
                    onClick={() => handlePowerRemove(current?.requiredPowers[pIndex])}
                  >
                    <MinusIcon className="h-5 w-5 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
              {/* Power Sets Lists fir Location and flag checkboxes*/}
              <div className="w-full p-4 grid grid-cols-2 bg-gray-800">
                <div className="col-span-1 bg-gray-900 py-2 pl-2 pr-1">
                  {/* Power Set Lists */}
                  <ul role="list" className='w-full h-full bg-gray-700'>
                    {current?.requiredPowers.map((powers, idx) => (
                      <li key={`test${powers}`} className={classNames(idx === pIndex ? "bg-sky-500 text-black" : "odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 text-gray-200", "flex p-4 cursor-pointer")} onClick={() => handleClickPowers(powers, idx)}>
                        <p className="text-sm font-medium">{getFlagStrings(powers)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Checkboxes */}
                <div className="col-span-1 bg-gray-900 py-2 pr-2 pl-1">
                  <div className='w-full h-full bg-gray-700 p-4 text-gray-200'>
                    {powers?.map(({ power, value, checked }) => (
                      <div key={`p${value}`}>
                        <label>
                          <input className="mr-2" type="checkbox" name={power} value={value} checked={checked} onClick={() => handlePowerClick(value)} />
                          {power}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </SecondaryContainer>
        </MainContainer>
      </div>
    </>
  )
}
