export default function Header() {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6 rounded-b-3xl relative">
      {/* Icons Row */}
      <div className="flex justify-between items-center">
        <button>
          <span role="img" aria-label="moon">
            🌙
          </span>
        </button>
        <button>
          <span role="img" aria-label="book">
            📖
          </span>
        </button>
      </div>

      {/* Title and Subtitle */}
      <div className="text-center mt-4 mb-2">
        <h1 className="text-xl font-bold">Daily Quran Reading</h1>
        <p className="text-sm text-purple-200 mt-1">
          Begin your journey with Allah's words
        </p>
      </div>
    </div>
  );
}
