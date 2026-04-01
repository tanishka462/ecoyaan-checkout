"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { cart, setCart } = useCart();

  function updateQty(id, delta) {
    const updated = {
      ...cart,
      cartItems: cart.cartItems.map((i) =>
        i.product_id === id
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      ),
    };
    setCart(updated);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.product_name}</p>
        <p className="text-xs text-gray-400 mt-0.5">₹{item.product_price} each</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQty(item.product_id, -1)}
            className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center text-sm hover:bg-gray-50"
          >−</button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQty(item.product_id, 1)}
            className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center text-sm hover:bg-gray-50"
          >+</button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-gray-800">
          ₹{item.product_price * item.quantity}
        </p>
      </div>
    </div>
  );
}