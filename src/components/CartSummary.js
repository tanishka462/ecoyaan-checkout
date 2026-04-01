"use client";

import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartSummary({ cart }) {
  const { cart: ctxCart, setCart, setCheckoutStep } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!ctxCart) setCart(cart);
  }, []);

  const activeCart = ctxCart || cart;

  const subtotal = activeCart.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity, 0
  );
  const total = subtotal + activeCart.shipping_fee;

  function handleProceed() {
    setCheckoutStep(2);
    router.push("/address");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Cart Items */}
      {activeCart.cartItems.map((item) => (
        <CartItem key={item.product_id} item={item} />
      ))}

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-2">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Order Summary</h2>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Subtotal</span>
          <span className="text-gray-800 font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Shipping</span>
          <span className="text-gray-800 font-medium">₹{activeCart.shipping_fee}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span className="text-green-600 text-lg">₹{total}</span>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-50">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            ← Back
          </button>
          <button
            onClick={handleProceed}
            className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
}