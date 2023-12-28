"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";


interface ContainerProps {
    children: React.ReactNode;
}




export const Container = ({
    children
}: ContainerProps) => {

    const {
        collapsed,
    } = useSidebar((state) => state);


    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>


    )}
