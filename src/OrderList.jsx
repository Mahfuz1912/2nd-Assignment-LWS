import { FilterIcon } from "./Icon";

function OrderList({ orders, filter, setFilter, onDeliver, onDelete }) {
  const filteredOrders =
    filter === "All"
      ? [...orders].sort((a, b) => b.id - a.id)
      : orders
          .filter((order) => order.status === filter)
          .sort((a, b) => b.id - a.id);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Order Reports</h2>
        <div className="flex gap-4 items-center">
          <FilterIcon />
          <select value={filter} className="outline-none bg-zinc-900" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-cardbg rounded-lg p-4">
        <div className="max-h-[340px] overflow-y-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.customerName}</td>
                  <td className="py-3">{order.items.length}</td>
                  <td className="py-3">BDT {order.total}</td>
                  <td className="py-3">
                    <span
                      className={
                        order.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => onDelete(order.id)}
                      className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300"
                    >
                      Delete
                    </button>
                    {order.status === "Pending" && (
                      <button
                        onClick={() => onDeliver(order.id)}
                        className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
                      >
                        DELIVER
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <p className="text-gray-500 py-4 text-center">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
