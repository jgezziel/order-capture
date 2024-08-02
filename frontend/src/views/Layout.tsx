import MenuAside from "../components/MenuAside";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";

const Layout = () => {
  const fetchCustomers = useAppStore((state) => state.fetchCustomers);
  const fetchProducts = useAppStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
        <MenuAside />
        <main className="p-8 overflow-y-scroll bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
