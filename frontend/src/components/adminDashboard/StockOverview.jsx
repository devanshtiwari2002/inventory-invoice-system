export default function StockOverview({ stock }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Stock Overview</h2>
      <ul className="space-y-2">
        {stock.map((item) => (
          <li
            key={item._id}
            className="flex justify-between border-b border-gray-700 pb-1"
          >
            <span>{item.name}</span>
            <span className="font-bold">{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
