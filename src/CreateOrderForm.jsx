import React, { useState } from "react";
import { PlusIcon } from "./Icon";
import PizzaImg from "../public/pizza.svg";
import BurgerImg from "../public/hamburger.svg";
import ChickenImg from "../public/chicken.svg";
import SubmarineImg from "../public/submarine.svg";

function CreateOrderForm({ onOrderSubmit }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [total, setTotal] = useState(0);

  const foodItems = [
    { name: "Hamburger", price: 300, image: BurgerImg },
    { name: "Chicken Nuggets", price: 300, image: ChickenImg },
    { name: "Submarine Sandwich", price: 300, image: SubmarineImg },
    { name: "Pizza slices", price: 300, image: PizzaImg },
  ];

  const handleAddItem = (item) => {
    const count = selectedItems[item.name] || 0;
    setSelectedItems({ ...selectedItems, [item.name]: count + 1 });
    setTotal(total + item.price);
  };

  const handleRemoveItem = (item) => {
    const count = selectedItems[item.name] || 0;
    if (count > 0) {
      const updatedItems = { ...selectedItems };
      if (count - 1 === 0) {
        delete updatedItems[item.name];
      } else {
        updatedItems[item.name] = count - 1;
      }
      setSelectedItems(updatedItems);
      setTotal(total - item.price);
    }
  };

  const [orderId, setOrderId] = useState(1); // top-level state

const handleSubmit = (e) => {
  e.preventDefault();

  const order = {
    id: orderId,
    customerName,
    items: Object.entries(selectedItems).map(([name, qty]) => {
      const item = foodItems.find((f) => f.name === name);
      return {
        name,
        quantity: qty,
        price: item.price,
        subtotal: item.price * qty,
      };
    }),
    total,
    status: "Pending",
  };

  onOrderSubmit(order);

  setOrderId((prev) => prev + 1); // increment ID
  setCustomerName("");
  setSelectedItems({});
  setTotal(0);
};

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of their requirements.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-gray-700/50 rounded-md p-2 outline outline-gray-500  focus:outline-none focus:ring-3 focus:ring-blue-500 focus:bg-gray-700/30 transition-all duration-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Choose Items</label>
          <div className="max-h-[250px] overflow-y-auto">
            {foodItems.map((item) => {
              const qty = selectedItems[item.name] || 0;
              return (
                <div
                  key={item.name}
                  className="bg-gray-700/30 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center mr-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-400">BDT {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {qty > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item)}
                        className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <span className="text-white">{qty > 0 ? qty : null}</span>
                    <button
                      type="button"
                      onClick={() => handleAddItem(item)}
                      className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={total === 0 || !customerName}
          className={`w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
            total === 0 || !customerName ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Place Order {total > 0 && `(BDT ${total})`}
        </button>
      </form>
    </div>
  );
}

export default CreateOrderForm;