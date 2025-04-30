import { Link, useLocation } from "react-router-dom";
import { HomeIcon, LineChartIcon, CreditCardIcon, UserIcon } from "lucide-react";

function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "Progress", icon: LineChartIcon, path: "/progress" },
    { label: "Payment", icon: CreditCardIcon, path: "/payment" },
    { label: "Profile", icon: UserIcon, path: "/profile" },
  ];

  return (
    <nav className=" fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex flex-col items-center text-xs py-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <Icon className="w-6 h-6 mb-1" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
