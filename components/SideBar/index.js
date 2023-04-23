import { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { classNames } from 'utils';

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative h-screen">
            {/* Mobile menu button */}
            <Disclosure
                as="div"
                className="fixed md:hidden flex h-full bg-gray-900"
                open={isOpen}
                onChange={setIsOpen}
            >
                {({ open }) => (
                    <>
                        {/* Sidebar */}
                        <Transition
                            show={open}
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition duration-[1] transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Disclosure.Panel
                                className="h-full w-screen bg-gray-800 text-white z-20"
                            >
                                <div className="h-full flex flex-col justify-between py-4">
                                    <div>
                                        {/* Sidebar children */}
                                        {children}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                        <Disclosure.Button
                            className={classNames(open ? "-left-4" : "", "relative z-50 w-4 h-full bg-gray-900")}
                        >
                            {open ? (
                                <div className="w-full py-8 bg-gray-700 hover:bg-gray-500">
                                    <ChevronLeftIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                </div>
                            ) : (
                                <div className="w-full py-8 bg-gray-700 hover:bg-gray-500">
                                    <ChevronRightIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                </div>
                            )}
                            <span className="sr-only">{open ? 'Close sidebar' : 'Open sidebar'}</span>
                        </Disclosure.Button>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default SideBar;
