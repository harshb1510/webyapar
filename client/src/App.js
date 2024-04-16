import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
   <Router>
    <Routes>
      {/* <Route path="/" Component={Home}>
      </Route> */}
      <Route path="/" Component={AdminLogin}>
      </Route>
    
    </Routes>
   </Router>
  );
}

export default App;