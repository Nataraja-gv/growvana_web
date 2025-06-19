import React, { useEffect, useState } from "react";
import {
  cartItemQuantity,
  clearCartitems,
  DeleteCartitem,
  getCartitem,
  getUserAddress,
} from "../services/cart/cart";
import { Trash2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { postOrder, postOrderRazorPay } from "../services/order/order";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddressId] = useState();
  const [paymentType, setPaymentType] = useState("COD");

  const handleQuantity = async (productId, action, colorType) => {
    try {
      const data = {
        productId,
        action,
        colorType,
      };
      const res = await cartItemQuantity(data);
      if (res) {
        fetchProductsCart();
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "Failed to update quantity", {
        variant: "error",
      });
    }
  };

  const navigate = useNavigate();
  const handleIncrement = (productId, colorType) => {
    handleQuantity(productId, "increment", colorType);
  };

  const handleDecrement = (productId, colorType) => {
    handleQuantity(productId, "decrement", colorType);
  };

  const fetchProductsCart = async () => {
    try {
      const res = await getCartitem();
      if (res) {
        setCart(res?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
     
    fetchProductsCart();
  }, []);

  const handleDeleteItem = async (productId) => {
    try {
      const data = {
        productId: productId,
      };
      const res = await DeleteCartitem(data);
      if (res) {
        enqueueSnackbar("remove item from Cart ", { variant: "success" });
        fetchProductsCart();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleClearitem = async () => {
    try {
      const res = await clearCartitems();
      if (res) {
        enqueueSnackbar("clear cart items", { variant: "success" });
        fetchProductsCart();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getUserAddress();
        if (res) {
          setAddress(res?.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAddress();
  }, []);

  const totalSubTotal = cart?.reduce((acc, item) => {
    const quantity = item.quantity || 0;
    const currentPrice = item.productId?.currect_price || 0;
    return acc + currentPrice * quantity;
  }, 0);

  const totalFinalPrice = cart?.reduce((acc, item) => {
    const quantity = item.quantity || 0;
    const offerPrice = item.productId.offer_price || 0;
    return acc + offerPrice * quantity;
  }, 0);

  const totalDisocunt = cart?.reduce((acc, item) => {
    const offerPrice = item?.productId?.offer_price || 0;
    const currentPrice = item?.productId?.currect_price || 0;
    const quantity = item?.quantity || 0;
    return acc + (currentPrice - offerPrice) * quantity;
  }, 0);

  const handleProceedPay = async () => {
    if (!selectedAddress) {
      enqueueSnackbar("address is required", { variant: "info" });
      return;
    }

    if (cart?.length <= 0) {
      enqueueSnackbar("Items is required", { variant: "info" });
      return;
    }

    if (!paymentType) {
      enqueueSnackbar("select payment is required", { variant: "info" });
      return;
    }

    try {
      const data = {
        address: selectedAddress,
        items: cart?.map((item) => ({
          product: item?.productId?._id,
          quantity: item?.quantity,
        })),
        paymentMethod: paymentType,
      };
      if (paymentType === "Online") {
        const razorPayResponse = await postOrderRazorPay(data);

        const order = razorPayResponse?.data;
        const options = {
          key: "rzp_test_AB3JXDeazzdzSW",
          amount: order.amount,
          currency: "INR",
          name: "GrowVana",
          description: "Test Transaction",
          image:
            "https://freshcartdev.s3.eu-north-1.amazonaws.com/growvana.jpg",
          order_id: order.id,
          // callback_url: "/track_order_page",
          prefill: {
            name: order.notes.name,
            email: order.notes.email,
            contact: "9999999999",
          },
          theme: {
            color: "#008000",
          },
          handler: function (order) {
            console.log(order, "response");
            window.location.href = "/track_order_page";
          },
          modal: {
            ondismiss: function () {
              window.location.href = "/cart";
            },
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        const res = await postOrder(data);
        if (res) {
          enqueueSnackbar("Order Placed successfully", { variant: "success" });
          navigate("/track_order_page");
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      window.location.href = "/cart";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🛒 Cart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8">
          {cart?.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  Your Shopping Cart
                </h2>
                <button
                  onClick={handleClearitem}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 transition text-white px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-6">
                {cart?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-6 border-b pb-6"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-5 flex-1">
                      <img
                        src={item?.productId?.product_images[0]?.image_link}
                        alt="product"
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item?.productId?.product_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item?.colorType}
                        </p>
                        <p className="mt-1 text-sm text-green-700 font-medium">
                          ₹{item?.productId?.offer_price}{" "}
                          <span className="text-gray-400 line-through ml-2">
                            ₹{item?.productId?.currect_price}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteItem(item?.productId?._id)}
                    >
                      <Trash2 size={20} />
                    </button>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleDecrement(item.productId?._id, item.colorType)
                        }
                        className="w-8 h-8 rounded-full border text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="text-base font-medium">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrement(item.productId?._id, item.colorType)
                        }
                        className="w-8 h-8 rounded-full border text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your cart is empty 🌱
              </h2>
              <p className="text-gray-500">
                Start adding some green to your life.
              </p>
            </div>
          )}
        </div>

        {/* 📦 Order Summary */}
        <div>
          <div className="mb-8">
            <div className=" flex justify-between items-center mb-[10px]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Delivery Address
              </h2>
              <button
                onClick={() => navigate("/address/new")}
                className="border-green-500 ring-2 ring-green-500 bg-green-50 rounded-[5px] text-[12px] p-[2px] cursor-pointer"
              >
                New Address
              </button>
            </div>
            <div className="grid gap-4 h-[300px] overflow-scroll">
              {address?.addresses?.map((addr, index) => {
                const isSelected = selectedAddress === addr._id;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedAddressId(addr._id)}
                    className={`cursor-pointer rounded-xl border-[1px] p-2 shadow-sm transition-all duration-200 ${
                      isSelected
                        ? "border-green-500 ring-2 ring-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300 hover:shadow-md"
                    }`}
                  >
                    <div className="text-sm text-gray-800 font-medium">
                      {addr.firstName} {addr.lastName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {addr.streetAddress}
                      <br />
                      {addr.city}, {addr.state}
                      <br />
                      {addr.country} - {addr.pinCode}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select Payment Type
            </h2>
            <div className="flex mb-[25px]">
              <div className="flex items-center me-4">
                <input
                  id="status-active"
                  type="radio"
                  value="true"
                  name="status"
                  checked={paymentType === "COD"}
                  onChange={() => setPaymentType("COD")}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="status-active"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Cash on Delivary
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="status-inactive"
                  type="radio"
                  value="false"
                  name="status"
                  checked={paymentType === "Online"}
                  onChange={() => setPaymentType("Online")}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="status-inactive"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Online Payment
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-[130px] h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">
                  ₹{totalSubTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">− ₹{totalDisocunt}</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-base font-semibold">
                <span>Total</span>
                <span>₹{totalFinalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleProceedPay}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl text-sm font-medium shadow"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
