import React from "react";
import { Layout } from "../public/components/Layout.jsx"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<Index />} />
              <Route path="events" element={<Events />} />
              <Route path="objects" element={<Objects />} />
              <Route path="companies" element={<Companies />} />
              <Route path="staff" element={<Staff />} />
              <Route path="/staff/:id" element={<EmployeeDetails />} />
              <Route path="system-log" element={<SystemLog />} />
              <Route path="directories" element={<Directories />} /> */}
            </Route>
          </Routes>
        </Router>
  );
}

export default App;