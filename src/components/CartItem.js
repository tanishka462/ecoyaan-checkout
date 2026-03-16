export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-md mb-4">

      <img
        src={item.image}
        alt={item.product_name}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <h2 className="font-semibold text-lg">{item.product_name}</h2>

        <p className="text-gray-600">
          Price: <span className="font-medium">₹{item.product_price}</span>
        </p>

        <p className="text-gray-600">
          Quantity: {item.quantity}
        </p>
      </div>

      <div className="font-semibold text-lg">
        ₹{item.product_price * item.quantity}
      </div>

    </div>
  );
}