export default function ServiceCard({ service, onSelect }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onSelect(service)}
    >
      <div className="text-5xl mb-4 text-center">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-600">
          ₹{service.base_price}
        </span>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          ~{service.estimated_duration} min
        </span>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Book Now →
      </button>
    </div>
  );
}
