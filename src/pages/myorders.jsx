import React, { useEffect, useState } from "react";
import { userOrdersAll } from "../services/order/order";
import {
  CheckCircle,
  IndianRupee,
  Home,
  CreditCard,
  Truck,
  BadgeCheck,
} from "lucide-react";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await userOrdersAll();
        setMyOrders(res?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchAllOrders();
  }, []);

  const deliveredOrders = myOrders.filter(
    (order) => order.orderStatus === "Delivered"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
          📦 Your Delivered Orders
        </h1>
        <p className="text-gray-500">Thank you for shopping with us!</p>
      </div>

      {deliveredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Truck size={48} className="mb-4" />
          <p className="text-lg font-medium">No delivered orders found.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {deliveredOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform hover:scale-[1.01]"
            >
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {order._id}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                  <CheckCircle size={16} /> Delivered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map(({ product, quantity, _id }) => (
                    <div
                      key={_id}
                      className="flex bg-gray-50 border rounded-xl p-4 hover:bg-white transition"
                    >
                      <img
                        src={product.product_images[0].image_link}
                        alt={product.product_name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                      <div className="ml-4 space-y-1">
                        <h4 className="font-semibold text-gray-800 ">
                          {product.product_name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          Qty: {quantity} * {product.offer_price}
                        </p>
                        <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <IndianRupee size={14} />{" "}
                          {product.offer_price * quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 border-t pt-4">
                  <div className="flex items-start gap-2">
                    <CreditCard size={16} className="mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-800">Payment</p>
                      <p>
                        {order.paymentMethod} - {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BadgeCheck size={16} className="mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Total Amount
                      </p>
                      <p>₹{order.totalAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Home size={16} className="mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Shipping Address
                      </p>
                      <p>
                        {order.address.firstName}, {order.address.streetAddress}
                        , {order.address.city}, {order.address.state} -{" "}
                        {order.address.pinCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
