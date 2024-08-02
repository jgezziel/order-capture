import { useEffect } from "react";
import TableOrders from "../components/TableOrders";
import { useAppStore } from "../stores/useAppStore";
const Orders = () => {
  const fetchOrders = useAppStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const orders = useAppStore((state) => state.orders);

  return (
    <>
      <TableOrders orders={orders} />
    </>
  );
};

export default Orders;
