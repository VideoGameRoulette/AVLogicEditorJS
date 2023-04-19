import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { Dialog, Disclosure } from '@headlessui/react';
import HeaderButton from 'components/HeaderButton';
import { classNames } from 'utils';

const Header = ({ links }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="z-50 w-full h-full bg-gray-800 text-white flex justify-between items-center gap-4 py-4 px-6">
            <div className="h-full flex justify-start items-center gap-4">
                <Link href="/" passHref legacyBehavior>
                    <a className="relative z-50">
                        <div className="w-8 h-8 rounded-md overflow-hidden">
                            <div className="bg-icon bg-contain bg-center w-full h-full" title="Axiom Verge Icon" />
                        </div>
                    </a>
                </Link>
                <div className="hidden lg:block bg-gray-900 text-gray-200 rounded-md px-3 py-1 font-semibold">v 1.65.5.71</div>
            </div>
            <div className="hidden md:-my-px md:ml-6 md:flex md:space-x-6">
                {links.map((l, idx) => (
                    <HeaderButton key={`header${idx}`} title={l.name} url={l.href} active={l.active} />
                ))}
            </div>
            <div className="flex md:hidden">
                <button
                    type="button"
                    className={classNames(mobileMenuOpen ? "bg-red-500" : "bg-gray-900", "p-2 flex items-center justify-center rounded-md text-gray-200 hover:bg-gray-700 cursor-pointer")}
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                >
                    <span className="sr-only">Open main menu</span>
                    {!mobileMenuOpen ? <Bars3Icon className="h-6 w-6" aria-hidden="true" /> : <XMarkIcon className="h-6 w-6" aria-hidden="true" />}
                </button>
            </div>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed top-16 right-0 z-10 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6 text-gray-200">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className=" flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-700">
                                                Editors
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {links.slice(0, 2).map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-700"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-700">
                                                Maps
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {links.slice(2, 5).map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-700"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-700">
                                                Widgets
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {links.slice(5, 7).map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-700"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

export default Header;