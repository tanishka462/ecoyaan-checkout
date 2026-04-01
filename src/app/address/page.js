"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi"
];

function AddressCard({ addr, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <div
      onClick={() => onSelect(addr.id)}
      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-green-500 bg-green-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {isSelected && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          Selected
        </span>
      )}
      <p className="font-semibold text-gray-800">{addr.name}</p>
      <p className="text-sm text-gray-500 mt-0.5">{addr.email} · +{addr.phone}</p>
      <p className="text-sm text-gray-600 mt-1">
        {addr.address1}{addr.address2 ? `, ${addr.address2}` : ""}
      </p>
      <p className="text-sm text-gray-600">
        {addr.city} - {addr.pincode}, {addr.state}
      </p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(addr); }}
          className="text-xs text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(addr.id); }}
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AddressForm({ onSave, onCancel, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const [phone, setPhone] = useState(defaultValues?.phone || "");

  function onSubmit(data) {
    onSave({ ...data, phone });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      
      <div className="md:col-span-2">
        <input
          {...register("name", { required: "Full name required" })}
          placeholder="Full Name"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            required: "Email required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
          })}
          placeholder="Email"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={setPhone}
          containerClass="w-full"
          inputClass="!w-full !h-[44px] !rounded-xl !border-gray-200 !text-sm"
        />
      </div>

      <div className="md:col-span-2">
        <input
          {...register("address1", { required: "Address required" })}
          placeholder="House No, Building, Street"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        {errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1.message}</p>}
      </div>

      <div className="md:col-span-2">
        <input
          {...register("address2")}
          placeholder="Area, Landmark (Optional)"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
      </div>

      <div>
        <input
          {...register("pincode", {
            required: "PIN required",
            pattern: { value: /^[0-9]{6}$/, message: "Invalid PIN (6 digits)" }
          })}
          placeholder="PIN Code"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
      </div>

      <div>
        <input
          {...register("city", { required: "City required" })}
          placeholder="City"
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      <div className="md:col-span-2">
        <select
          {...register("state", { required: "Select state" })}
          className="border border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm text-gray-600"
        >
          <option value="">Select State</option>
          {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
      </div>

      <div className="md:col-span-2 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition"
        >
          Save Address
        </button>
      </div>

    </form>
  );
}

function AddressContent() {
  const { addresses, addAddress, updateAddress, deleteAddress, selectAddress, selectedAddressId, setCheckoutStep } = useCart();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);

  function handleSave(data) {
    if (editingAddr) {
      updateAddress(editingAddr.id, data);
    } else {
      addAddress(data);
    }
    setShowForm(false);
    setEditingAddr(null);
  }

  function handleEdit(addr) {
    setEditingAddr(addr);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingAddr(null);
  }

  function handleContinue() {
    if (!selectedAddressId) return alert("Please select or add an address.");
    setCheckoutStep(3);
    router.push("/payment");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-28">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Shipping Address
        </h1>

        {/* Saved Address Cards */}
        {addresses.length > 0 && (
          <div className="flex flex-col gap-3 mb-5">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                addr={addr}
                isSelected={selectedAddressId === addr.id}
                onSelect={selectAddress}
                onEdit={handleEdit}
                onDelete={deleteAddress}
              />
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        {!showForm && (
          <button
            onClick={() => { setEditingAddr(null); setShowForm(true); }}
            className="w-full border-2 border-dashed border-green-400 text-green-600 py-3 rounded-2xl text-sm font-medium hover:bg-green-50 transition"
          >
            + Add {addresses.length > 0 ? "Another" : "New"} Address
          </button>
        )}

        {/* Address Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-4">
            <h2 className="text-base font-semibold text-gray-700 mb-1">
              {editingAddr ? "Edit Address" : "New Address"}
            </h2>
            <AddressForm
              onSave={handleSave}
              onCancel={handleCancel}
              defaultValues={editingAddr || {}}
            />
          </div>
        )}

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-50">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => { setCheckoutStep(1); router.push("/"); }}
            className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            Continue to Payment →
          </button>
        </div>
      </div>

    </div>
  );
}

export default function AddressPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <AddressContent />
    </Suspense>
  );
}