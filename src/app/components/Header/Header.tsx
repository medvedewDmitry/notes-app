'use client'

import {useState} from 'react'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    DocumentIcon
} from '@heroicons/react/24/outline'
import './header.scss'
import Link from "next/link";
import Button from "@mui/material/Button";
import {HeaderProps} from "@/app/interfaces";

/**
 * Компонент шапки сайта
 */
const Header = ({onChangeTab}: HeaderProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="header">
            <nav aria-label="Global" className="header__nav">
                <div className="header__logo">
                    <a href="/" className="header__logo__link">
                        <DocumentIcon aria-hidden="true" className="h-7 w-7 "/>
                        <span className="text-xl">Заметки</span>
                    </a>
                </div>


                <div className="menu--desktop">
                    <Button
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => {
                            onChangeTab('main')
                        }}
                    >Заметки</Button>
                    <Button className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => {
                                onChangeTab('archive')
                            }}
                    >Архив</Button>
                </div>

                <div className="menu--mobile">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="menu--mobile__button "
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                    </button>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <div className="header__logo--mobile">
                            <a href="/" className="header__logo__link">
                                <DocumentIcon aria-hidden="true" className="h-7 w-7 "/>
                                <span className="text-xl">Заметки</span>
                            </a>
                        </div>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Закрыть меню</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link href="/"
                                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Заметки</Link>
                                <Link href="/archive"
                                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Архив</Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header;