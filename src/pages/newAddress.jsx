import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { newAddress } from "../services/cart/cart";
import { useNavigate } from "react-router-dom";

const NewAddress = () => {
  const [form, setForm] = useState({
    firstName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newAddress(form);
      if (res) {
        enqueueSnackbar("New Address added Successfully", {
          variant: "success",
        });
        navigate("/cart");
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Add New Address
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", name: "firstName", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
          { label: "Street Address", name: "streetAddress", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "Pin Code", name: "pinCode", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition duration-200"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
