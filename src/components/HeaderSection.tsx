export default function Header() {
    return (
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6 rounded-b-3xl relative">
        {/* Icons Row */}
        <div className="flex justify-between items-center">
          <button>
            <span role="img" aria-label="moon">🌙</span>
          </button>
          <button>
            <span role="img" aria-label="book">📖</span>
          </button>
        </div>

        {/* Title and Progress */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold">Daily Quran Reading</h1>
          <p className="text-sm text-purple-200">Begin your journey with Allah's words</p>
          <div className="relative w-32 h-32 mx-auto mt-4">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-purple-300"
                strokeDasharray="100, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="text-green-400"
                strokeDasharray="79, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              79%
            </div>
          </div>
        </div>
      </div>
    );
  }