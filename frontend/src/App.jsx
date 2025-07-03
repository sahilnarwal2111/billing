
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import {
    BrowserRouter as Router,
    Route, Routes
} from 'react-router-dom';
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path={"/"} element = {<Signin/>}></Route>
          <Route path={"/signin"} element = {<Signin/>}></Route>
          <Route path={"/signup"} element = {<Signup/>}></Route>
          <Route path={"/transfer"} element={<SendMoney />} />
          <Route path={"/dashboard"} element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
