import { v4 as uuidv4 } from "uuid";
import { useState, type ChangeEvent } from "react";
import TableProducts from "../components/TableProducts";
import { useAppStore } from "../stores/useAppStore";
import { TablePreOrder } from "../components/TablePreOrder";
import type { Order } from "../types";

const Index = () => {
  const customers = useAppStore((state) => state.customers);
  const products = useAppStore((state) => state.products);
  const preOrder = useAppStore((state) => state.preOrder);
  const saveOrder = useAppStore((state) => state.saveOrder);

  const fetchShippingAddresses = useAppStore(
    (state) => state.fetchShippingAddresses
  );
  const shippingAddresses = useAppStore((state) => state.shippingAddresses);

  const handleCustomerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const customerId = Number(event.target.value);
    fetchShippingAddresses(customerId);
  };

  const [dataCustomer, setDataCustomer] = useState({
    idCustomer: "",
    idShippingAddress: "",
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCustomer({
      ...dataCustomer,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "idCustomer") {
      handleCustomerChange(e);
    }
  };

  const handleOrder = async () => {
    if (!dataCustomer.idCustomer || !dataCustomer.idShippingAddress) {
      alert("Selecciona un cliente y una dirección de envio");
      return;
    }
    const { idCustomer, idShippingAddress } = dataCustomer;
    const order: Order = {
      idOrder: uuidv4(),
      idCustomer: Number(idCustomer),
      idShippingAddress: Number(idShippingAddress),
      preOrder,
    };
    saveOrder(order);
    setDataCustomer({
      idCustomer: "",
      idShippingAddress: "",
    });
  };

  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Captura de pedidos</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col mb-6">
          <label
            htmlFor="idCustomer"
            className="inline-block mb-3 text-xl font-bold"
          >
            Cliente
          </label>
          <select
            id="idCustomer"
            name="idCustomer"
            className="px-4 py-2 transition-all rounded-lg ring-1 ring-zinc-300 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-purple-400 focus:ring-offset-purple-500 placeholder:text-zinc-400"
            onChange={handleChange}
            value={dataCustomer.idCustomer}
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
            htmlFor="idShippingAddress"
            className="inline-block mb-3 text-xl font-bold"
          >
            Direccción de envio
          </label>
          <select
            id="idShippingAddress"
            name="idShippingAddress"
            className="px-4 py-2 transition-all rounded-lg ring-1 ring-zinc-300 focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-purple-400 focus:ring-offset-purple-500 placeholder:text-zinc-400 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={shippingAddresses.length === 0}
            onChange={handleChange}
            value={dataCustomer.idShippingAddress}
          >
            <option hidden>Selecciona una opción</option>
            {shippingAddresses.length === 0 ? (
              <option hidden>No hay direcciones de envio</option>
            ) : (
              shippingAddresses.map((shippingAddress) => (
                <option key={shippingAddress.id} value={shippingAddress.id}>
                  {shippingAddress.address}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
      <div className="p-6 overflow-x-scroll border rounded-md bg-zinc-50 max-h-[300px] mb-4">
        <TableProducts products={products} />
      </div>
      <button
        className="px-4 py-2 mt-3 text-white transition-all bg-purple-500 rounded-md hover:bg-purple-500/90 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={preOrder.length === 0}
        onClick={handleOrder}
      >
        Guardar pedido
      </button>
      <div className="my-6">
        <TablePreOrder preOrder={preOrder} products={products} />
      </div>
    </>
  );
};

export default Index;
