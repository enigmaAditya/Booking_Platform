import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            House Help Services
          </h1>
          <p className="text-2xl mb-4">
            Get help within 15 minutes
          </p>
          <p className="text-xl mb-12 opacity-90">
            Cleaning • Plumbing • Electrical • Cooking & More
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
            <p className="opacity-90">Get help within 15 minutes of booking</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Verified Helpers</h3>
            <p className="opacity-90">All helpers are background verified</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p className="opacity-90">Know the cost upfront, no hidden charges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
