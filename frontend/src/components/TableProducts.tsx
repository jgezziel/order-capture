import type { Product } from "../types";

type ProductsProps = {
  products: Product[];
};
const TableProducts = ({ products }: ProductsProps) => {
  return (
    <>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableProducts;
