import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching orders from an API
  useEffect(() => {
    const fetchOrders = async () => {

      const response = await axios.get('http://localhost:3000/api/order', {
        withCredentials: true
      });

      setOrders(response.data.orders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 h-screen">
      <h1 className="text-2xl font-semibold mb-4">Customer Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order._id}</td>
                  <td className="py-2 px-4 border-b">{order.userId.name}</td>
                  <td className="py-2 px-4 border-b">
                    ${(order.totalAmount / 100).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${order.status === 'succeeded' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
