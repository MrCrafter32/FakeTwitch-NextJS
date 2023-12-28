import { ImageError } from "next/dist/server/image-optimizer";
import Image from "next/image";

const AuthLayout = ( { 
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#09090b] ">
        <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={150}
        />
        <p>
            <span className="text-[#f9f9fa]">Welcome to Faketwitch</span>
        </p>
        {children}
        </div>
    )
}

export default AuthLayout;