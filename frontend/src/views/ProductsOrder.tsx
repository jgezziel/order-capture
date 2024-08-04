import {
  redirect,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { getProductOrdersByKey } from "../services/ProductOrderService";
import type { ProductOrder } from "../types";
import TableProductsOrder from "../components/TableProductsOrder";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const productOrderByKey = await getProductOrdersByKey(params.id);
    if (!productOrderByKey) {
      return redirect("/");
    }
    return productOrderByKey.data;
  }
};

const ProductsOrder = () => {
  const productsOrder = useLoaderData() as ProductOrder[];
  return (
    <>
      <TableProductsOrder productsOrder={productsOrder} />
    </>
  );
};

export default ProductsOrder;
