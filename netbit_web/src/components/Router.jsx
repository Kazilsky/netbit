import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SettingsList from "../pages/Settings/Settings"
import DMChat from "../pages/Chat/DMChat"
import Header from "./Header";

const Routers = () => {
  return (
    <div class="flex flex-col max-h-screen overflow-hidden">
    <Router>
        <Header />
      <main class="mt-20">
        <Routes>
          <Route path="/">
            {/* <Route index element={<BasePage />} /> */}
            <Route path="setting" element={<SettingsList />} />
            <Route path="dmchat" element={<DMChat />} />
          </Route>
        </Routes>
      </main>
    </Router>
    </div>
    
  )
}
export default Routers;