import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import type { PreOrder, Product } from "../types";
import { useAppStore } from "../stores/useAppStore";

export type TablePreOrderProps = {
  preOrder: PreOrder[];
  products: Product[];
};

export const TablePreOrder = ({ preOrder, products }: TablePreOrderProps) => {
  const removePreStore = useAppStore((state) => state.removePreStore);
  const increaseQuantity = useAppStore((state) => state.increaseQuantity);
  const decreaseQuantity = useAppStore((state) => state.decreaseQuantity);

  const productsPreOrder = preOrder.map((item) => {
    const product = products.find((product) => product.id === item.idProduct);
    const subtotal = product ? product.price * item.quantity : 0;

    return { ...item, product, subtotal };
  });

  return (
    <>
      {preOrder.length === 0 ? (
        <div className="flex items-center justify-center h-44">
          <h1 className="text-3xl font-bold text-zinc-300">
            No hay productos por seleccionados
          </h1>
        </div>
      ) : (
        <>
          <div className="overflow-x-scroll">
            <div className="pb-3 mb-6 border-b border-zinc-200">
              <h1 className="text-3xl font-bold">Productos Seleccionados</h1>
            </div>
            <table className="w-full">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="px-4 py-2 text-white border">SKU</th>
                  <th className="px-4 py-2 text-white border">Cantidad</th>
                  <th className="px-4 py-2 text-white border">Precio</th>
                  <th className="px-4 py-2 text-white border">Subtotal</th>
                  <th className="px-4 py-2 text-white border">Acciones</th>
                </tr>
              </thead>
              {
                <tbody>
                  {productsPreOrder.map((item) => (
                    <tr key={item.idProduct}>
                      <td className="px-4 py-2 border">{item.product?.sku}</td>
                      <td className="px-4 py-2 text-center border">
                        <div className="flex justify-center gap-4">
                          <button
                            className="p-1 text-white transition-all rounded bg-zinc-800 hover:bg-zinc-900"
                            type="button"
                            title="Disminuir"
                            onClick={() => decreaseQuantity(item.idProduct)}
                          >
                            <MinusIcon className="size-5" />
                          </button>
                          {item.quantity}
                          <button
                            className="p-1 text-white transition-all rounded bg-zinc-800 hover:bg-zinc-900"
                            type="button"
                            title="Aumentar"
                            onClick={() => increaseQuantity(item.idProduct)}
                          >
                            <PlusIcon className="size-5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 border">${item.price}</td>
                      <td className="px-4 py-2 border">${item.subtotal}</td>
                      <td className="px-4 py-2 text-center border">
                        <button
                          className="p-2 text-white transition-all bg-red-500 rounded-full hover:bg-red-600"
                          type="button"
                          title="Eliminar"
                          onClick={() => removePreStore(item.idProduct)}
                        >
                          <XMarkIcon className="size-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              }
            </table>
          </div>
        </>
      )}
    </>
  );
};
