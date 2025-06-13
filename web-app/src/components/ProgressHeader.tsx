interface ProgressHeaderProps {
  completed: number;
  missed: number;
  donated: number;
}

export default function ProgressHeader({
  completed,
  missed,
  donated,
}: ProgressHeaderProps) {
  return (
    <div className="flex justify-between text-center">
      <div className="bg-gray-800 p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-400">Completed</p>
        <p className="text-green-400 text-lg font-bold">{completed}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-400">Missed</p>
        <p className="text-red-400 text-lg font-bold">{missed}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-400">Donated</p>
        <p className="text-green-400 text-lg font-bold"> ${donated}</p>
      </div>
    </div>
  );
}
