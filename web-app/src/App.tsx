import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BottomNavigation } from "@components/.";
import { Home, Progress, Payment, Profile } from "@pages/.";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
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
