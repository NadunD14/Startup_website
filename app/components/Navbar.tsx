import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
    const session = await auth()

    return (
        <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <header className='flex justify-between items-center'>
                <nav className='flex items-center'>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={100} height={100} />
                    </Link>
                </nav>

                <div className='flex items-center gap-5 text-black'>
                    {session && session.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: '/' })
                            }}>
                                <button type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"
                            await signIn('github')
                        }}>
                            <button type="submit">
                                <span>Login</span>
                            </button>
                        </form>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Navbar