import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./views/Layout";
import Index from "./views/Index";
import Customers from "./views/Customers";
import Products from "./views/Products";
import Orders from "./views/Orders";
import ProductsOrder, {
  loader as readProductsOrderKey,
} from "./views/ProductsOrder";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      <Route path="customers" element={<Customers />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route
        path="products-order/:id"
        element={<ProductsOrder />}
        loader={readProductsOrderKey}
      />
    </Route>
  )
);

export default AppRouter;
