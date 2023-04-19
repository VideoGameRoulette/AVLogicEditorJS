import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import { MainContainer, SecondaryContainer } from 'components/Containers';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { classNames } from 'utils';
import HeaderButton from 'components/HeaderButton';
import Powers from 'components/Powers';
import { LocationComboBox } from 'components/ComboBox';

const links = [
  {
    name: 'Items',
    href: '/items',
    active: false
  },
  {
    name: 'Locations',
    href: '/locations',
    active: true
  },
  {
    name: 'Debugger',
    href: '/map/debugger',
    active: false
  },
  {
    name: 'Tracker',
    href: '/map/tracker',
    active: false
  },
  {
    name: 'Spoilers',
    href: '/map/spoilers',
    active: false
  },
  {
    name: 'Item Tracker',
    href: '/widgets/items',
    active: false
  },
  {
    name: 'Stats Tracker',
    href: '/widgets/stats',
    active: false
  },
];

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

  const handlePowerRemove = (index) => {
    setCurrent(prev => {
      const newRequiredPowers = [...prev.requiredPowers];
      newRequiredPowers.splice(index, 1);
      setPIndex(0);
      setPowers(createPowerObjects(newRequiredPowers[0]));
      return { ...prev, requiredPowers: newRequiredPowers };
    });

  };

  return (
    <>
      <Head>
        <title>Location Logic Editor | Axiom Verge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-full bg-gray-100 overflow-hidden">
        <MainContainer>
          <Header links={links} />
          <SecondaryContainer>
            {/* Left Container */}
            <nav className="hidden md:flex bg-gray-900 text-white w-full h-full overflow-hidden flex-col p-2">
              {/* Load and Save Buttons */}
              <div className="w-full flex gap-2 mb-2 bg-gray-900">
                <label htmlFor="fileInput" className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-center cursor-pointer">
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
              <LocationComboBox options={locations} callback={handleItemClick} imageCB={getItemNameForImage} />
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
                    onClick={() => handlePowerRemove(pIndex)}
                  >
                    <MinusIcon className="h-5 w-5 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
              {/* Power Sets Lists fir Location and flag checkboxes*/}
              {current && (
                <div className="w-full p-4 grid md:grid-cols-[1fr_16rem] bg-gray-800">
                  <div className="col-span-1 bg-gray-900 pt-2 pb-1 md:py-2 px-2 md:pl-2 md:pr-1">
                    {/* Power Set Lists */}
                    <ul role="list" className='w-full h-full bg-gray-700'>
                      {current?.requiredPowers.map((powers, idx) => (
                        <li key={`power${idx}`} className={classNames(idx === pIndex ? "bg-sky-500 text-black" : "odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 text-gray-200", "flex p-4 cursor-pointer")} onClick={() => handleClickPowers(powers, idx)}>
                          <p className="text-sm font-medium">{getFlagStrings(powers)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Checkboxes */}
                  <div className="col-span-1 bg-gray-900 pt-1 pb-2 md:py-2 px-2 md:pr-2 md:pl-1">
                    <div className='w-full h-full bg-gray-700 p-4 text-gray-200'>
                      {powers?.map(({ power, value, checked }) => (
                        <div key={`p${value}`}>
                          <label>
                            <input className="mr-2 md:my-0 my-2" type="checkbox" name={power} value={value} checked={checked} onClick={() => handlePowerClick(value)} />
                            {power}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </SecondaryContainer>
        </MainContainer>
      </div>
    </>
  )
}
