import { Sun, Moon, UserPlus, User, Menu } from 'react-feather'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'state/Auth'
import Drawer from 'components/Drawer'
import SearchModal from 'components/modals/SearchModal'
import LoginModal from 'components/modals/LoginModal'

export default function Header() {
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [mounted, setMounted] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [searchModalVisibility, setSearchModalVisibility] = useState(false)
    const [loginModalVisibility, setLoginModalVisibility] = useState(false)

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href

        return (
            <Link
                href={href}
                className={`${
                    isActive
                        ? 'font-semibold text-neutral-800 dark:text-neutral-200'
                        : 'font-normal text-neutral-600 dark:text-neutral-400'
                } ${
                    href == '/' ? 'inline-block' : 'hidden'
                } transition-all sm:px-3 sm:py-2 md:inline-block
                `}
            >
                <span className="capsize text-xl transition duration-300 hover:text-purple-600 md:text-base">
                    {text}
                </span>
            </Link>
        )
    }

    return (
        <>
            <LoginModal
                modalVisibility={loginModalVisibility}
                setModalVisibility={setLoginModalVisibility}
            />
            <div className="flex flex-col justify-center">
                <nav className="relative flex w-full items-center justify-between border-neutral-200 bg-opacity-60 pt-4 text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
                    <div className="flex">{ThemeButton()}</div>
                    <div>
                        <Drawer
                            setShowDrawer={setShowDrawer}
                            showDrawer={showDrawer}
                        />
                        <NavItem href="/" text="Pardis" />
                        <NavItem href="/products" text="Products" />
                        <NavItem href="/blog" text="Blog" />
                        <NavItem href="/docs/welcome" text="Documentation" />
                    </div>
                    {mounted && (
                        <div className="flex">
                            {isAuthenticated ? (
                                <Link href="/user">
                                    <button
                                        aria-label="Authentication"
                                        type="button"
                                        className={`hidden md:flex ${getHeaderButtonStyles()}`}
                                    >
                                        <User className="h-5 w-5" />
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={() =>
                                        setLoginModalVisibility(true)
                                    }
                                    aria-label="Authentication"
                                    type="button"
                                    className={`hidden md:flex ${getHeaderButtonStyles()}`}
                                >
                                    <UserPlus className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                aria-label="Mobile Menu"
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:bg-neutral-700 md:hidden"
                                onClick={() => setShowDrawer(true)}
                            >
                                <Menu className="h-5 w-5 " />
                            </button>
                        </div>
                    )}
                </nav>
            </div>
            <hr className="border-1 mt-4 mb-8 w-full border-neutral-200 dark:border-neutral-800" />
        </>
    )
}

function getHeaderButtonStyles() {
    return 'h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 transition-all hover:bg-purple-600                                             hover:text-white dark:bg-neutral-700 hover:dark:bg-purple-600'
}

function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            aria-label="Toggle Dark / Light Theme"
            type="button"
            className={`flex ${getHeaderButtonStyles()}`}
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
        >
            {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    )
}
