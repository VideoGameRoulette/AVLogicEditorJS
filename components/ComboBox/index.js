import { useState } from 'react'
import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { classNames } from '@/utils';

export const ItemComboBox = ({ options, callback, imageCB, stringCB }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchText, setSearchText] = useState('')

    const handleInputChange = (event) => {
        setSearchText(event.target.value)
        setIsOpen(event.target.value.length > 0)
    }

    const filteredOptions = options?.filter((option) =>
        option.name.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Items..."
                className="w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                value={searchText}
                onChange={handleInputChange}
            />
            <div className="absolute top-0 left-0 w-10 h-full flex items-center justify-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-white" />
            </div>
            <button
                className="absolute top-0 right-0 px-3 py-2 text-gray-700 rounded-md dark:text-white focus:outline-none"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {isOpen ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-500 dark:text-white" />
                ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-500 dark:text-white" />
                )}
            </button>
            <Transition
                show={isOpen}
                enter="transform transition duration-[500ms] ease-in-out"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="transform transition duration-[300ms] ease-in-out"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
            >
                <div className="absolute h-auto max-h-96 z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-800 overflow-y-auto scrollbar-hide">
                    {filteredOptions !== undefined && filteredOptions.map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md cursor-pointer"
                            onClick={() => {
                                setSearchText("")
                                setIsOpen(false)
                                callback(option)
                            }}
                        >
                            <div className="h-8 w-8 rounded-full">
                                <div className={imageCB(option.name)} />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs font-medium">{option.name}</p>
                                <p className="text-sm">{stringCB(option.powers)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Transition>
        </div>
    )
}

export const LocationComboBox = ({ options, callback, imageCB }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchText, setSearchText] = useState('')

    const handleInputChange = (event) => {
        setSearchText(event.target.value)
        setIsOpen(event.target.value.length > 0)
    }

    const filteredOptions = options?.filter((option) =>
        option.name.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Item Locations..."
                className="w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                value={searchText}
                onChange={handleInputChange}
            />
            <div className="absolute top-0 left-0 w-10 h-full flex items-center justify-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-white" />
            </div>
            <button
                className="absolute top-0 right-0 px-3 py-2 text-gray-700 rounded-md dark:text-white focus:outline-none"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {isOpen ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-500 dark:text-white" />
                ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-500 dark:text-white" />
                )}
            </button>
            <Transition
                show={isOpen}
                enter="transform transition duration-[500ms] ease-in-out"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="transform transition duration-[300ms] ease-in-out"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
            >
                <div className="absolute h-auto max-h-96 z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-800 overflow-y-auto scrollbar-hide">
                    {filteredOptions !== undefined && filteredOptions.map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center px-4 py-2 text-gray-800 cursor-default dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md cursor-pointer"
                            onClick={() => {
                                setSearchText("")
                                setIsOpen(false)
                                callback(option)
                            }}
                        >
                            <div className="h-8 w-8 rounded-full">
                                <div className={imageCB(option.name)} />
                            </div>
                            <div className="ml-3">
                                {Boolean(option.area) && (<p className="text-xs font-bold">{option.area}</p>)}
                                <p className="text-xs font-medium">{option.name}</p>
                                <p className="text-xs">{option.id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Transition>
        </div>
    )
}
