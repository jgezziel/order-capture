import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

const Customers = () => {
  const fetchCustomers = useAppStore((state) => state.fetchCustomers);
  const customers = useAppStore((state) => state.customers);

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </div>
      <table className="w-full">
        <thead className="bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-white border">ID</th>
            <th className="px-4 py-2 text-white border">Nombre</th>
            <th className="px-4 py-2 text-white border">RFC</th>
            <th className="px-4 py-2 text-white border">Direccion Fiscal</th>
            <th className="px-4 py-2 text-white border">Email</th>
            <th className="px-4 py-2 text-white border">Teléfono</th>
            <th className="px-4 py-2 text-white border">Contacto</th>
            <th className="px-4 py-2 text-white border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-2 border">{customer.id}</td>
              <td className="px-4 py-2 border">{customer.name}</td>
              <td className="px-4 py-2 border">{customer.rfc}</td>
              <td className="px-4 py-2 border">{customer.fiscalAddress}</td>
              <td className="px-4 py-2 border">{customer.email}</td>
              <td className="px-4 py-2 border">{customer.phone}</td>
              <td className="px-4 py-2 border">{customer.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Customers;
