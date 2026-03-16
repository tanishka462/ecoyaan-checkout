import { cartData } from "../data/cartData";
import CartSummary from "../components/CartSummary";

export default async function Home() {

  const data = cartData;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Cart
      </h1>

      <CartSummary cart={data} />

    </div>
  );
}