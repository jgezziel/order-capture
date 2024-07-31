import Footer from "../components/Footer";
import { Outlet, Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
        <aside className="flex flex-col p-4 overflow-y-auto bg-zinc-100">
          <ul className="space-y-4">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/customers">Clientes</Link>
            </li>
          </ul>
        </aside>
        <main className="p-8 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Root;
