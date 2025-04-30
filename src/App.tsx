import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* الصفحات */}
        <div className="flex-grow pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
