import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BarChart3Icon,
  MicIcon,
  UserIcon,
} from 'lucide-react';

function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: HomeIcon, path: '/home' },
    { label: 'Profile', icon: UserIcon, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-indigo-800 shadow-lg z-50">
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20"></div>
      <ul className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path} className="relative">
              <Link
                to={item.path}
                className={`flex flex-col items-center text-xs py-2.5 ${
                  isActive ? 'text-amber-300' : 'text-indigo-300'
                } transition-colors duration-200`}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 ${
                    isActive ? 'stroke-amber-300' : 'stroke-indigo-300'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={isActive ? 'font-medium' : 'font-normal'}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
