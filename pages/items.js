import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import Powers from 'components/Powers';
import { MainContainer, SecondaryContainer } from 'components/Containers';
import { ItemComboBox } from 'components/ComboBox';
import { RoomTypesS } from "components/RoomTypesS";
import { classNames } from 'utils';

const links = [
  {
    name: 'Items',
    href: '/items',
    active: true
  },
  {
    name: 'Locations',
    href: '/locations',
    active: false
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
  const [items, setItems] = useState(null);
  const [current, setCurrent] = useState(null);
  const [powers, setPowers] = useState(null);

  const itemsRef = useRef(items);

  useEffect(() => {
    if (current === null) return;

    const newData2 = [...itemsRef.current]; // Use the current value of itemsRef

    newData2.map((item, idx) => {
      if (item.name === current.name) {
        newData2[idx] = current;
      }
    });

    if (JSON.stringify(newData2) !== JSON.stringify(itemsRef.current)) { // Compare new value with previous value
      setItems(newData2);
      itemsRef.current = newData2; // Update the reference to the new value
    }
  }, [current]);

  // Handle for saving json file
  function downloadLogicFile(data) {
    const filename = "items_custom.json";
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
        setItems(data);
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
    setPowers(createPowerObjects(p));
  };

  // Handles Location Click
  const handlePowerClick = (value) => {
    var newData = current.powers;
    var c = newData;
    var n = Powers.hasPower(c, value) ? Powers.removePower(c, value) : Powers.addPower(c, value);
    newData = n;
    setCurrent(prev => ({ ...prev, powers: newData }));
    var newPowers = powers;
    newPowers.map(p => {
      if (p.value === value)
        p.checked = !p.checked;
    });
    setPowers(newPowers);
  };

  // Handles Location Click
  const handleItemClick = (item) => {
    setCurrent(item);
    setPowers(null);
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

  function getItemByValue(value) {
    const room = RoomTypesS.find(room => room.name === value);
    return room.item ? room.item : "";
  }

  return (
    <>
      <Head>
        <title>Item Logic Editor | Axiom Verge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-full bg-gray-100 overflow-hidden">
        <MainContainer>
          <Header links={links} />
          <SecondaryContainer>
            {/* Left Container */}
            <div className="hidden md:flex bg-gray-900 text-white w-full h-full overflow-hidden flex-col p-2">
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
                <button className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-center" onClick={() => downloadLogicFile(items)}>
                  Save
                </button>
              </div>
              {/* Location List */}
              <ItemComboBox options={items} callback={handleItemClick} imageCB={getItemByValue} stringCB={getFlagStrings} />
            </div>
            {/* Right Container */}
            <main className="bg-gray-800 w-full h-full overflow-y-auto grid-rows-[4rem_1fr]">
              {/* Header Title and Add / Remove Buttons */}
              <div className="w-full h-16 flex justify-between items-center bg-gray-700">
                <h1 className="font-bold text-xl text-gray-200 p-4">{current?.name}</h1>
              </div>
              {/* Power Sets Lists fir Location and flag checkboxes*/}
              {current && (
                <div className="w-full p-4 grid grid-cols-1 bg-gray-800">
                  <div className="col-span-1 bg-gray-900 pt-2 pb-1 px-2">
                    {/* Power Set Lists */}
                    <ul role="list" className='w-full h-full bg-gray-700'>
                      {current && (
                        <li key={`test${current?.powers}`} className={classNames("odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 text-gray-200 flex p-4 cursor-pointer")} onClick={() => handleClickPowers(current?.powers)}>
                          <p className="text-sm font-medium">{getFlagStrings(current?.powers)}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* Checkboxes */}
                  <div className="col-span-1 bg-gray-900 pt-1 pb-2 px-2">
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
              )}
            </main>
          </SecondaryContainer>
        </MainContainer>
      </div>
    </>
  )
}
