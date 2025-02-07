import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarSmall from "./components/calendar/calendar-small";
import CalendarBig from "./components/calendar/calendar-big";
import EventDetail from "./components/events/eventdetail";


const Home = () => {
  return (
    <div style={{ display: "flex", height: "auto", padding: "20px", background: '#DFEBEB' }}>
      <div
        style={{
          flex: 1,
          maxWidth: "25%",
          borderRight: "1px solid #ddd",
          paddingRight: "10px",
        }}
      >
        <CalendarSmall />
      </div>
      <div style={{ flex: 3, paddingLeft: "10px" }}>
        <CalendarBig />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
