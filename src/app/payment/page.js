"use client";

import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {

  const { cart, address } = useCart();
  const router = useRouter();

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow text-center w-full max-w-sm">
          <h2 className="text-lg md:text-xl font-semibold">
            Cart is empty
          </h2>

          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const total = subtotal + cart.shipping_fee;

  function pay() {
    router.push("/success");
  }

  return (

    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">
          Review & Payment
        </h1>

        {/* ORDER ITEMS */}

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-5 md:mb-6">

          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Order Items
          </h2>

          {cart.cartItems.map((item) => (

            <div
              key={item.product_id}
              className="flex justify-between items-center border-b py-3 text-sm md:text-base"
            >

              <span className="flex-1">
                {item.product_name} × {item.quantity}
              </span>

              <span className="font-medium">
                ₹{item.product_price * item.quantity}
              </span>

            </div>

          ))}

        </div>


        {/* SHIPPING ADDRESS */}

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-5 md:mb-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-lg md:text-xl font-semibold">
              Shipping Address
            </h2>

            <button
              onClick={() => router.push("/address?edit=true")}
              className="text-blue-600 text-sm md:text-base hover:underline"
            >
              Edit
            </button>

          </div>

          {address ? (

            <div className="text-gray-700 space-y-1 text-sm md:text-base">

              <p className="font-medium">{address.name}</p>

              <p>{address.email}</p>

              <p>{address.phone}</p>

              {address.address1 && <p>{address.address1}</p>}

              {address.address2 && <p>{address.address2}</p>}

              <p>
                {address.city}, {address.state}
              </p>

              <p>
                PIN: {address.pincode}
              </p>

            </div>

          ) : (

            <p className="text-gray-500 text-sm">
              No address found
            </p>

          )}

        </div>


        {/* PAYMENT SUMMARY */}

        <div className="bg-white rounded-lg shadow p-4 md:p-6">

          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Payment Summary
          </h2>

          <div className="flex justify-between mb-2 text-sm md:text-base">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-4 text-sm md:text-base">
            <span>Shipping</span>
            <span>₹{cart.shipping_fee}</span>
          </div>

          <div className="flex justify-between font-semibold text-base md:text-lg border-t pt-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={pay}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
          >
            Pay Securely
          </button>

        </div>

      </div>

    </div>

  );
}