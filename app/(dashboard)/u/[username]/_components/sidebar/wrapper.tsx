"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creatorsidebar";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside className={cn(
      "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-border z-50 overflow-hidden transition-[width] duration-300 ease-out",
      collapsed && "lg:w-[70px]"
    )}>
      {children}
    </aside>
  );
};
