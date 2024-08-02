import type { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  //const products = await getShippingAddresses(4);
  console.log(params);
  return {};
};

const ProductsOrder = () => {
  return <div>ProductsOrder</div>;
};

export default ProductsOrder;
