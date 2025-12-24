"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster theme="system" position="bottom-center" />
      {children}
    </NextThemesProvider>
  );
};
