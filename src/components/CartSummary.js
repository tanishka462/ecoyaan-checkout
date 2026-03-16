"use client";

import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartSummary({ cart }) {

  const router = useRouter();
  const { setCart } = useCart();

  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const total = subtotal + cart.shipping_fee - cart.discount_applied;

  function checkout() {
    setCart(cart);
    router.push("/address");
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-6">
        {cart.cartItems.map((item) => (
          <CartItem key={item.product_id} item={item} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">

        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹{cart.shipping_fee}</span>
        </div>

        <hr className="my-3"/>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={checkout}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg cursor-pointer"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}