"use client";

import {cn} from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";


interface WrapperProps {
    children: React.ReactNode;
    }

export const Wrapper = ({ children }: WrapperProps) => {
    const [isClient , setIsClient ] = useState(false);
    const { collapsed } = useSidebar((state) => state);

    useEffect(() => {
        setIsClient(true);
    
    }, [])

    if (!isClient) return (
        <aside className= { cn ("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-border z-50 overflow-hidden transition-[width] duration-300 ease-out",
        collapsed && "w-[70px]"
        )} >
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    )

    return (
        <aside className= { cn ("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-border z-50 overflow-hidden transition-[width] duration-300 ease-out",
        collapsed && "w-[70px]"
        )} >
            {children}
        </aside>
    )}