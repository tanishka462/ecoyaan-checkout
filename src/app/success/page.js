"use client";

import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const { cart, selectedAddress, setCheckoutStep } = useCart();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setShow(true), 100);
    // Reset checkout step
    setCheckoutStep(1);
  }, []);

  const subtotal = cart?.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity, 0
  ) || 0;
  const total = subtotal + (cart?.shipping_fee || 0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div
        className={`w-full max-w-md transition-all duration-500 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">Order Placed!</h1>
          <p className="text-sm text-gray-400 mb-6">
            Thank you for shopping with Ecoyaan 🌱
          </p>

          {/* Order Summary */}
          {cart && (
            <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Order Summary
              </p>
              {cart.cartItems.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm text-gray-600 mb-1.5">
                  <span className="truncate flex-1 mr-2">{item.product_name} × {item.quantity}</span>
                  <span className="font-medium text-gray-800 shrink-0">₹{item.product_price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-800">
                <span>Total Paid</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          {selectedAddress && (
            <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Delivering To
              </p>
              <p className="text-sm font-semibold text-gray-800">{selectedAddress.name}</p>
              <p className="text-sm text-gray-500">
                {selectedAddress.address1}, {selectedAddress.city} - {selectedAddress.pincode}
              </p>
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}