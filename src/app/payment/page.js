"use client";

import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentPage() {
  const { cart, selectedAddress, setCheckoutStep } = useCart();
  const router = useRouter();

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center w-full max-w-sm border border-gray-100">
          <div className="text-4xl mb-3">🛒</div>
          <h2 className="text-lg font-semibold text-gray-800">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mt-1 mb-5">Add some items to get started</p>
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity, 0
  );
  const total = subtotal + cart.shipping_fee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-28">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Review & Payment
        </h1>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Order Items
          </h2>
          <div className="flex flex-col gap-3">
            {cart.cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 shrink-0">
                  ₹{item.product_price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Shipping Address
            </h2>
            <button
              onClick={() => { setCheckoutStep(2); router.push("/address"); }}
              className="text-xs text-green-600 font-medium hover:underline"
            >
              Change
            </button>
          </div>

          {selectedAddress ? (
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-semibold text-gray-800">{selectedAddress.name}</p>
              <p>{selectedAddress.email} · +{selectedAddress.phone}</p>
              <p>{selectedAddress.address1}
                {selectedAddress.address2 ? `, ${selectedAddress.address2}` : ""}
              </p>
              <p>{selectedAddress.city} - {selectedAddress.pincode}, {selectedAddress.state}</p>
            </div>
          ) : (
            <div className="text-center py-3">
              <p className="text-sm text-gray-400 mb-2">No address selected</p>
              <button
                onClick={() => router.push("/address")}
                className="text-sm text-green-600 font-medium hover:underline"
              >
                + Add Address
              </button>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Payment Summary
          </h2>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Subtotal</span>
            <span className="text-gray-800 font-medium">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Shipping</span>
            <span className="text-gray-800 font-medium">₹{cart.shipping_fee}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span className="text-green-600 text-lg">₹{total}</span>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-50">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => { setCheckoutStep(2); router.push("/address"); }}
            className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => { setCheckoutStep(4); router.push("/success"); }}
            disabled={!selectedAddress}
            className="flex-[2] bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            🔒 Pay Securely →
          </button>
        </div>
      </div>

    </div>
  );
}