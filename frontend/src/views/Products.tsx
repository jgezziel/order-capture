import TableProducts from "../components/TableProducts";
import { useAppStore } from "../stores/useAppStore";
const Products = () => {
  const products = useAppStore((state) => state.products);
  return (
    <>
      <TableProducts products={products} />
    </>
  );
};

export default Products;
