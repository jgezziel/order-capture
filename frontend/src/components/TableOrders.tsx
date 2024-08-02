import { EyeIcon } from "@heroicons/react/24/solid";
import type { Orders } from "../types";
import { useNavigate } from "react-router-dom";

type TableOrdersProps = {
  orders: Orders[];
};

const TableOrders = ({ orders }: TableOrdersProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="pb-3 mb-6 border-b border-zinc-200">
        <h1 className="text-3xl font-bold">Pedidos</h1>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-white border">ID</th>
              <th className="px-4 py-2 text-white border">Clave</th>
              <th className="px-4 py-2 text-white border">Cliente</th>
              <th className="px-4 py-2 text-white border">
                Dirección de envío
              </th>
              <th className="px-4 py-2 text-white border">Fecha de pedido</th>
              <th className="px-4 py-2 text-white border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.idOrder}</td>
                <td className="px-4 py-2 border">{order.customer}</td>
                <td className="px-4 py-2 border">{order.shippingAddress}</td>
                <td className="px-4 py-2 border">{order.dateOrder}</td>
                <td className="px-4 py-2 text-center border">
                  <button
                    className="p-2 font-bold text-white rounded bg-cyan-500 hover:bg-cyan-600"
                    type="button"
                    onClick={() => navigate(`/products-order/${order.idOrder}`)}
                  >
                    <EyeIcon className="size-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableOrders;
