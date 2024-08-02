import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Product } from "../types";
import { useLocation } from "react-router-dom";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";

type ProductsProps = {
  products: Product[];
};
const TableProducts = ({ products }: ProductsProps) => {
  const addStore = useAppStore((state) => state.addPreStore);
  const handleClic = (product: Product) => {
    const { id, price } = product;
    addStore({ idProduct: id, quantity: 1, price });
  };

  const { pathname } = useLocation();

  const isProducts = useMemo(() => pathname === "/products", [pathname]);

  return (
    <>
      <div className="overflow-x-scroll">
        <div className="pb-3 mb-6 border-b border-zinc-200">
          <h1 className="text-3xl font-bold">Productos</h1>
        </div>
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-white border">ID</th>
              <th className="px-4 py-2 text-white border">SKU</th>
              <th className="px-4 py-2 text-white border">Descripción</th>
              <th className="px-4 py-2 text-white border">Unidad de medida</th>
              <th className="px-4 py-2 text-white border">Precio</th>
              {!isProducts && (
                <th className="px-4 py-2 text-white border">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.sku}</td>
                <td className="px-4 py-2 border">{product.description}</td>
                <td className="px-4 py-2 border">{product.measurementUnit}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                {!isProducts && (
                  <td className="px-4 py-2 text-center border">
                    <button
                      className="p-2 font-bold text-white rounded bg-zinc-800 hover:bg-zinc-700"
                      type="button"
                      title="Agregar"
                      onClick={() => handleClic(product)}
                    >
                      <ArchiveBoxIcon className="size-6" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableProducts;
