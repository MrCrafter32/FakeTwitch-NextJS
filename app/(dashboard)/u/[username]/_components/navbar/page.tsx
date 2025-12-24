import Image from "next/image"
import Link from "next/link"
import { Actions } from "./actions"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-20 z-[49] bg-background/80 backdrop-blur border-b border-border px-2 lg:px-4 flex justify-between items-center shadow-sm flex-row">
            <Link href="/" className="hidden md:block">
            <Image priority className="hidden md:block" src="/logo.svg" width={50} height={50} alt="logo" />
            </Link>
            <Actions />
        </nav>
    )
}
