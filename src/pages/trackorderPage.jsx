import React, { useEffect, useState } from "react";
import { userOrdersAll } from "../services/order/order";
import {
  Truck,
  Timer,
  CheckCircle2,
  LoaderCircle,
  PackageCheck,
  MapPin,
  CalendarCheck,
  CreditCard,
  CircleDollarSign,
} from "lucide-react";

const statusSteps = [
  {
    key: "Processing",
    label: "Processing",
    icon: <Timer className="text-yellow-500" />,
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: <Truck className="text-blue-500" />,
  },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    icon: <LoaderCircle className="text-purple-500 animate-spin" />,
  },
];

const TrackOrderPage = () => {
  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await userOrdersAll();
        const filtered = (res?.data || []).filter(
          (order) =>
            order.orderStatus !== "Delivered" &&
            order.paymentStatus !== "Failed"
        );
        setActiveOrders(filtered);
      } catch (error) {
        console.error("Error fetching active orders:", error.message);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🚚 Track Your Orders
      </h2>

      {activeOrders.length < 0 ? (
        <div className="text-center py-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No Orders"
            className="w-40 mx-auto mb-6 opacity-70"
          />
          <p className="text-lg text-gray-500">No active orders to track.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {activeOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-200 shadow-xl bg-white p-6 transition duration-300 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs text-gray-500">Order ID:</p>
                  <p className="font-semibold text-gray-800">{order._id}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarCheck className="w-4 h-4" />
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {order?.items.map(({ product, quantity, _id }) => (
                  <div
                    key={_id}
                    className="border p-3 rounded-xl flex items-center gap-4 bg-gray-50 hover:bg-gray-100"
                  >
                    <img
                      src={product.product_images[0].image_link}
                      alt={product.product_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {product.product_name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {quantity} *{product?.offer_price}
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        ₹{product.offer_price * quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center overflow-x-auto space-x-4 pb-4">
                {statusSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className={`flex flex-col items-center text-center ${
                        step.key === order.orderStatus ? "" : "opacity-40"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                        {step.icon}
                      </div>
                      <p className="mt-1 text-xs font-medium text-gray-700">
                        {step.label}
                      </p>
                    </div>
                    {idx !== statusSteps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
                <div className="flex gap-2 items-start">
                  <MapPin className="mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Shipping Address</p>
                    <p>
                      {order.address.firstName}, {order.address.streetAddress},{" "}
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <CreditCard className="mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Payment</p>
                    <p>
                      {order.paymentMethod} -{" "}
                      <span className="capitalize">{order.paymentStatus}</span>
                    </p>
                    <p className="text-green-600 font-semibold mt-1 flex items-center gap-1">
                      ₹ {order.totalAmount}
                    </p>
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

export default TrackOrderPage;
