export default function Header() {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6 rounded-b-3xl relative overflow-hidden">
      {/* Islamic Ornamental Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-500"></div>
      
      {/* Islamic Dome Shape - Top Corners */}
      <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full border-2 border-amber-300/30"></div>
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full border-2 border-amber-300/30"></div>
      
      {/* Icons Row */}

      {/* Title and Subtitle */}
      <div className="text-center mt-4 mb-2 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-12 h-px bg-amber-300/70"></span>
          <h1 className="text-xl font-bold">Daily Quran Reading</h1>
          <span className="w-12 h-px bg-amber-300/70"></span>
        </div>
        <p className="text-sm text-purple-200">
          Begin your journey with Allah's words
        </p>
      </div>
    </div>
  );
}
