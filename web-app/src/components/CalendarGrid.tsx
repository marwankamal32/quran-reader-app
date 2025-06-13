type DayStatus = 'completed' | 'missed' | 'upcoming';

interface CalendarDay {
  day: number;
  status: DayStatus;
}

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const daysInMonth = getDaysInMonth(currentMonth, currentYear);

const days: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => ({
  day: i + 1,
  status: i < 15 ? 'completed' : i < 18 ? 'missed' : 'upcoming',
}));

const statusColors: Record<DayStatus, string> = {
  completed: 'bg-green-500',
  missed: 'bg-red-400',
  upcoming: 'bg-gray-600',
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarGrid() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold text-center mb-4 text-white">
        {monthNames[currentMonth]} {currentYear}
      </h2>

      <div className="grid grid-cols-7 gap-4">
        {days.map(({ day, status }) => (
          <div key={day} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full ${statusColors[status]} flex items-center justify-center text-white font-bold`}
            >
              {day}
            </div>
            <span className="text-xs capitalize mt-1 text-gray-300">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
