import { Sidebar } from "./_components/sidebar/page";
import { Navbar } from "./_components/navbar/page";
import { Container } from "./_components/container";

const browseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default browseLayout;
