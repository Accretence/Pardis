import { User, UserMinus, UserPlus, Sun, Moon } from 'react-feather'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from 'state/Auth'
import Toast from 'components/Toast'
import LoginModal from 'components/modals/LoginModal'

export default function Drawer({ showDrawer, setShowDrawer }) {
    const router = useRouter()
    const { resolvedTheme, setTheme } = useTheme()

    const [toast, setToast] = useState(null)
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [loading, setLoading] = useState(false)
    const [loginModalVisibility, setLoginModalVisibility] = useState(false)

    async function onLogout() {
        const { status } = await fetch('/api/auth/logout')

        if (status == 200) {
            setLocalAuthentication(false)
            router.replace('/')
            setToast('Successfully logged out.')
        }
    }

    return (
        <>
            <LoginModal
                modalVisibility={loginModalVisibility}
                setModalVisibility={setLoginModalVisibility}
            />
            {toast && <Toast message={toast} />}
            <div
                className={`${
                    showDrawer ? 'translate-x-0' : '-translate-x-full'
                } fixed top-0 right-0 z-10 h-full w-full transition duration-300`}
                onClick={() => setShowDrawer(false)}
            >
                <div className="top-0 left-0 z-20 flex h-full w-[70vw] flex-col gap-2 border-r border-r-neutral-300 bg-neutral-100/95 p-10 dark:border-r-neutral-700 dark:bg-neutral-900/95">
                    <button
                        aria-label="Toggle Dark Mode"
                        type="button"
                        className="flex h-14 w-full items-center justify-center rounded-lg border border-neutral-400 bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:border-neutral-500 dark:bg-neutral-700"
                        onClick={() =>
                            setTheme(
                                resolvedTheme === 'dark' ? 'light' : 'dark'
                            )
                        }
                    >
                        {resolvedTheme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                    {isAuthenticated ? (
                        <>
                            <Link href="/user">
                                <button
                                    aria-label="Authentication"
                                    type="button"
                                    className="flex h-14 w-full items-center justify-center rounded-lg bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:bg-neutral-700"
                                >
                                    <User className="h-5 w-5" />
                                </button>
                            </Link>
                            <div className="inline-flex w-full items-center justify-center">
                                <hr className="my-4 h-px w-64 border-0 bg-neutral-300 dark:bg-neutral-600" />
                            </div>
                            <button
                                aria-label="Authentication"
                                type="button"
                                className="flex h-14 w-full items-center justify-center rounded-lg bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:bg-neutral-700"
                                onClick={onLogout}
                            >
                                <UserMinus className="h-5 w-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setShowDrawer(false)
                                setLoginModalVisibility(true)
                            }}
                            aria-label="Authentication"
                            type="button"
                            className="flex h-14 w-full items-center justify-center rounded-lg bg-neutral-200 ring-neutral-300 transition-all hover:ring-2 dark:bg-neutral-700"
                        >
                            <UserPlus className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
