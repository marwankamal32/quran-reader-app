type ProgressHeaderProps = {
  completed: number;
  missed: number;
  donated: number;
};

export default function ProgressHeader({
  completed,
  missed,
  donated,
}: ProgressHeaderProps) {
  return (
    <div className="flex justify-between text-center">
      <div className="bg-white p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-500">Completed</p>
        <p className="text-green-600 text-lg font-bold">{completed}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-500">Missed</p>
        <p className="text-red-600 text-lg font-bold">{missed}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex-1 mx-2">
        <p className="text-xm text-gray-500">Donated</p>
        <p className="text-blue-600 text-lg font-bold"> ${donated}</p>
      </div>
    </div>
  );
}
