import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SettingsList  from "../pages/Settings/Settings"
import DMChat from "../pages/Chat/DMChat"

const Routers = () => {
    return(
    <Router>
      <Routes>
          <Route path="/">
              {/* <Route index element={<BasePage />} /> */}
                <Route path="setting" element={<SettingsList />} />
                <Route path="dmchat" element={<DMChat />} />
                
          </Route>
      </Routes>
    </Router>    
    )
}
export default Routers;