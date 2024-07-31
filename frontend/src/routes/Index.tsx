const Index = () => {
  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Captura de pedidos</h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col mb-6">
          <label
            htmlFor="customer"
            className="inline-block mb-3 text-xl font-bold"
          >
            Cliente
          </label>
          <select
            id="customer"
            name="customer"
            className="px-4 py-2 transition-all rounded-lg ring-1 ring-zinc-300 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-purple-400 focus:ring-offset-purple-500 placeholder:text-zinc-400"
          >
            <option hidden>Selecciona una opción</option>
            <option value="1">Cliente 1</option>
            <option value="2">Cliente 2</option>
            <option value="3">Cliente 3</option>
          </select>
        </div>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="deliveryAddress"
            className="inline-block mb-3 text-xl font-bold"
          >
            Direccción de envio
          </label>
          <select
            id="deliveryAddress"
            name="deliveryAddress"
            className="px-4 py-2 transition-all rounded-lg ring-1 ring-zinc-300 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-purple-400 focus:ring-offset-purple-500 placeholder:text-zinc-400"
          >
            <option hidden>Selecciona una opción</option>
            <option value="1">Dirección 1</option>
            <option value="2">Dirección 2</option>
            <option value="3">Dirección 3</option>
          </select>
        </div>
      </div>
      <div className="p-6 border rounded-md bg-zinc-50">
        <label
          htmlFor="products"
          className="inline-block mb-3 text-xl font-bold"
        >
          Productos
        </label>
      </div>
    </>
  );
};

export default Index;
