import { cartData } from "../data/cartData";
import CartSummary from "../components/CartSummary";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-28">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Your Cart
        </h1>
        <CartSummary cart={cartData} />
      </div>
    </div>
  );
}