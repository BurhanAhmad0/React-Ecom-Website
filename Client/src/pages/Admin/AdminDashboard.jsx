import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {

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
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600 text-sm font-medium">Total Users</h2>
            <p className="text-2xl font-semibold text-blue-600 mt-2">1,240</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600 text-sm font-medium">Total Orders</h2>
            <p className="text-2xl font-semibold text-green-600 mt-2">4,532</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600 text-sm font-medium">Total Products</h2>
            <p className="text-2xl font-semibold text-yellow-600 mt-2">620</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-600 text-sm font-medium">Revenue</h2>
            <p className="text-2xl font-semibold text-red-600 mt-2">$53,100</p>
          </div>
        </div>

        {/* Recent Orders Table (Placeholder) */}
        <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
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
                  {orders.slice(0, 6).map((order) => (
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
      </div>
    </div>
  );
};

export default AdminDashboard;
