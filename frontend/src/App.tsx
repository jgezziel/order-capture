import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="grid grid-cols-[250px_1fr] grid-rows-[1fr_auto] h-screen">
        <aside className="flex flex-col p-4 overflow-y-auto bg-zinc-100">
          <ul className="space-y-4">
            <li>
              <a href="#none">Inicio</a>
            </li>
            <li>
              <a href="#none">Clientes</a>
            </li>
          </ul>
        </aside>
        <main className="p-8 bg-white">
          <Pedidos />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default App;
