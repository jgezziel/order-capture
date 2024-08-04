import {
  getPDFProductOrdersKey,
  getXMLproductIndex,
} from "../services/ProductOrderService";
import type { ProductOrder } from "../types";
import { DocumentIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

type TableProductsOrderProps = {
  productsOrder: ProductOrder[];
};

const TableProductsOrder = ({ productsOrder }: TableProductsOrderProps) => {
  const id = productsOrder[0].idOrder;

  const handleGetPDF = async () => {
    await getPDFProductOrdersKey(id);
  };

  const handleGetXMLIndex = async (
    id: ProductOrder["idOrder"],
    index: number
  ) => {
    await getXMLproductIndex(id, index);
  };

  return (
    <div>
      <div className="overflow-x-scroll">
        <div className="pb-3 mb-6 border-b border-zinc-200">
          <h1 className="text-3xl font-bold">Productos por pedido</h1>
        </div>
        <div className="my-6 text-right">
          <button
            type="button"
            className="inline-block p-2 font-bold text-white transition-all bg-red-600 rounded hover:bg-red-600/90"
            onClick={handleGetPDF}
          >
            <div className="flex gap-2">
              Descargar PDF <DocumentIcon className="size-6" />
            </div>
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-white border">ID</th>
              <th className="px-4 py-2 text-white border">ID Orden</th>
              <th className="px-4 py-2 text-white border">ID Producto</th>
              <th className="px-4 py-2 text-white border">Cantidad</th>
              <th className="px-4 py-2 text-white border">Precio por unidad</th>
              <th className="px-4 py-2 text-white border">Total</th>
              <th className="px-4 py-2 text-white border">XML</th>
            </tr>
          </thead>
          <tbody>
            {productsOrder.map((productOrder, ind) => (
              <tr key={productOrder.id}>
                <td className="px-4 py-2 border">{productOrder.id}</td>
                <td className="px-4 py-2 border">{productOrder.idOrder}</td>
                <td className="px-4 py-2 border">{productOrder.idProduct}</td>
                <td className="px-4 py-2 border">{productOrder.quantity}</td>
                <td className="px-4 py-2 border">$ {productOrder.price}</td>
                <td className="px-4 py-2 border">
                  $ {productOrder.price * productOrder.quantity}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    type="button"
                    className="p-2 font-bold text-white transition-all rounded bg-slate-500 hover:bg-slate-500/90"
                    onClick={() => handleGetXMLIndex(productOrder.idOrder, ind)}
                  >
                    <div className="flex gap-2">
                      <DocumentTextIcon className="size-6" />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProductsOrder;
