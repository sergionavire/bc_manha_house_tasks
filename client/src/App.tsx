import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { UserHome } from "./routes/user/UserHome";
import { UserNew } from "./routes/user/UserNew";
import { UserView } from "./routes/user/UserView";
import { UserUpdate } from "./routes/user/UserUpdate";
import { HouseHome } from "./routes/house/HouseHome";
import { HouseNew } from "./routes/house/HouseNew";
import { HouseView } from "./routes/house/HouseView";
import { HouseUpdate } from "./routes/house/HouseUpdate";
import { WorkDayHome } from "./routes/work_day/WorkDayHome";
import { WorkDayNew } from "./routes/work_day/WorkDayNew";
import { WorkDayView } from "./routes/work_day/WorkDayView";
import { WorkDayUpdate } from "./routes/work_day/WorkDayUpdate";
import { AppBar } from "./components/AppBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<WorkDayHome />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/user-new/" element={<UserNew />} />
          <Route path="/user-view/:id" element={<UserView />} />
          <Route path="/user-update/:id" element={<UserUpdate />} />
          <Route path="/house" element={<HouseHome />} />
          <Route path="/house-new/" element={<HouseNew />} />
          <Route path="/house-view/:id" element={<HouseView />} />
          <Route path="/house-update/:id" element={<HouseUpdate />} />
          <Route path="/workday" element={<WorkDayHome />} />
          <Route path="/workday-new/" element={<WorkDayNew />} />
          <Route path="/workday-view/:id" element={<WorkDayView />} />
          <Route path="/workday-update/:id" element={<WorkDayUpdate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
