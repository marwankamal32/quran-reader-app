type DayStatus = "completed" | "missed" | "donated" | "upcoming" ;

interface CalendarDay {
    day: number;
    status: DayStatus;
}

const days : CalendarDay[] = Array.from({length: 30}, (_,i) => ({
    day: i+1,
    status: i < 15 ? "completed" : i < 18 ? "missed" : i < 20 ? "donated" : "upcoming"
}));

const statusColors : Record<DayStatus, string> = {
    completed: "bg-green-500",
    missed: "bg-red-400",
    donated: "bg-blue-500",
    upcoming: "bg-gray-200"
};

export default function CalendarGrid() {
    return(
        <div className="grid grid-cols-5 gap-4 p-4">
            {days.map(({ day , status }) => (
                <div key={day} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${statusColors[status]} flex items-center justify-center text-white font-bold`}>
                        {day}
                    </div>
                    <span className="text-xs capitalize mt-1 text-gray-600">{status}</span>
                </div>
            ))}
        </div>
    );
}