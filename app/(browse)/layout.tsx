import { Sidebar, SidebarSkeleton } from "./_components/sidebar/page";
import { Navbar } from "./_components/navbar/page";
import { Container } from "./_components/container";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


const browseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20 ">
        <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
        </Suspense>
        <Container>
          {children}
          <Analytics />
          <SpeedInsights />

        </Container>
      </div>
    </>
  );
};

export default browseLayout;
