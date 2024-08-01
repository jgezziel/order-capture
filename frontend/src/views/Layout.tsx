import MenuAside from "../components/MenuAside";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
        <MenuAside />
        <main className="p-8 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
