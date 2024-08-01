import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

const Index = () => {
  const fetchCustomers = useAppStore((state) => state.fetchCustomers);
  const customers = useAppStore((state) => state.customers);
  const selectCustomer = useAppStore((state) => state.selectCustomer);
  const selectedShippingAddresses = useAppStore(
    (state) => state.selectedShippingAddresses
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Captura de pedidos</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
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
            onChange={(e) => selectCustomer(Number(e.target.value))}
          >
            <option hidden>Selecciona una opción</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
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
            className="px-4 py-2 transition-all rounded-lg ring-1 ring-zinc-300 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-purple-400 focus:ring-offset-purple-500 placeholder:text-zinc-400 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedShippingAddresses.length === 0}
          >
            <option hidden>Selecciona una opción</option>
            {selectedShippingAddresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.NameShort} - {address.address}
              </option>
            ))}
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
