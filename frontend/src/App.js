import "./Assets/Css/Utilities.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Chat from "./Pages/Chat";
import Setting from "./Pages/Setting";
import Register1 from "./Pages/Auth/Register1";
import Register2 from "./Pages/Auth/Register2";
import Register3 from "./Pages/Auth/Register3";
import NotFound from "./Pages/NotFound";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register1 />} />
            <Route path="/register/2" element={<Register2 />} />
            <Route path="/register/3" element={<Register3 />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Router>
   );
}

export default App;
