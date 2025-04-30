export default function TodaysReading () {
    return(
        <div className="bg-white rounded-xl shadow p-4 m-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="calendar">📅</span>
              <h2 className="font-semibold text-lg">Today's Reading</h2>
            </div>
            <p className="text-orange-500 mt-2">Waiting for today's reading</p>
            <p className="text-sm text-gray-500">
              If missed: <span className="text-blue-600">$5</span> donation will be made
            </p>
          </div>
          <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm">Goal: 1 min</span>
        </div>
      </div>
    );
}