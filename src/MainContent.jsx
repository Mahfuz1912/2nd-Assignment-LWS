import React, { useState } from "react";
import OrderList from "./OrderList";
import OrderSummary from './OrderSummary';
import CreateOrderForm from "./CreateOrderForm";

const MainContent = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleNewOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const handleDeliver = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrderForm onOrderSubmit={handleNewOrder} />
      
      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderSummary 
          totalOrders={totalOrders} 
          pendingCount={pendingCount} 
          deliveredCount={deliveredCount} 
        />
        
        <OrderList
          orders={orders}
          filter={filter}
          setFilter={setFilter}
          onDeliver={handleDeliver}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MainContent;