import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Index from "./views/Index";
import Customers from "./views/Customers";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
